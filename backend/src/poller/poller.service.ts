import { BadRequestException, Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { SiteService } from "src/layers/site/site.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import {
    catchError,
    concatMap,
    forkJoin,
    map,
    of,
    retryWhen,
    throwError,
    timer,
} from "rxjs";
import { EnumRequestMethod } from "@prisma/client";
import { AxiosResponse } from "axios";
import { PollService } from "src/layers/poll/poll.service";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";

@Injectable()
export class PollerService {
    private currentTake = 0;
    private static okResponseRange = Array.from(
        { length: 100 },
        (_, i) => 200 + i,
    );

    constructor(
        private readonly logger: PinoLogger,
        private readonly siteService: SiteService,
        private readonly pollingTaskService: PollingTaskService,
        private readonly config: ConfigService,
        private readonly httpService: HttpService,
        private readonly pollService: PollService,
    ) {
        logger.setContext(PollerService.name);
    }

    private pollWebsites(
        addressList: string[],
        method: EnumRequestMethod = "HEAD",
    ): Promise<
        Array<{ ok: boolean; status: number; url: string; retryCount: number }>
    > {
        const axiosMethodMap: Record<EnumRequestMethod, string> = {
            GET: "get",
            HEAD: "head",
            // TODO implement ping method
            PING: "head",
        };

        const handleRequest = (url: string) => {
            let retryCount = 0;

            return new Promise(async (resolve) => {
                this.httpService[axiosMethodMap[method]](url)
                    .pipe(
                        map((response: AxiosResponse) => ({
                            url,
                            status: response.status,
                            ok: PollerService.okResponseRange.includes(
                                response.status,
                            ),
                        })),
                        retryWhen((errors) =>
                            errors.pipe(
                                concatMap((error, i) => {
                                    if (i < this.config.get("retryCount")) {
                                        retryCount++;

                                        return timer(500);
                                    } else {
                                        return throwError(() => error);
                                    }
                                }),
                            ),
                        ),
                        catchError((error) => {
                            const status = error.response
                                ? error.response?.status
                                : 500;

                            return of({ url, status, ok: false });
                        }),
                    )
                    .subscribe({
                        next: (value) => resolve({ ...value, retryCount }),
                    });
            });
        };

        return new Promise((resolve) => {
            forkJoin(addressList.map((url) => handleRequest(url))).subscribe(
                (result: any) => {
                    resolve(result);
                },
            );
        });
    }

    async triggerPoll(userId: number) {
        this.logger.info("triggerPoll");

        const hasRunningTasks = await this.pollingTaskService.hasRunningTask();

        if (hasRunningTasks) {
            this.logger.error(
                "startPoll: Attempt to poll when already started",
            );

            throw new BadRequestException();
        }

        const newTask = await this.pollingTaskService.create({
            triggeredBy: "MANUAL",
        });

        this.poll(userId, newTask.id, newTask.requestMethod);

        return { id: newTask.id };
    }

    private async poll(
        userId: number,
        pollingTaskId: number,
        requestMethod: EnumRequestMethod,
    ) {
        this.logger.info("startPoll");

        const siteProcessCount = this.config.get("siteProcessCount");

        while (true) {
            const sites = await this.siteService.getPaginated(
                userId,
                this.currentTake,
                siteProcessCount,
            );

            if (sites.length === 0) {
                break;
            }

            const poll = await this.pollWebsites(
                sites.map((site) => site.address),
                requestMethod,
            );

            await this.pollService.createMany(
                poll.map((data) => ({
                    siteId: sites.find((site) => site.address === data.url).id,
                    statusCode: data.status.toString(),
                    retryCount: data.retryCount,
                    requestMethod,
                })),
            );

            this.currentTake += sites.length;
        }

        this.currentTake = 0;
        await this.pollingTaskService.update(pollingTaskId, {
            pollingState: "IDLE",
            endTime: new Date().toISOString(),
        });

        this.logger.info("startPoll: ended");
    }
}
