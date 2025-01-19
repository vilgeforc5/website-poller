import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { SiteService } from "src/layers/site/site.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { StateService } from "src/layers/state/state.service";
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
        private readonly stateService: StateService,
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

    async triggerPoll() {
        this.logger.info("triggerPoll");

        const state = await this.stateService.getState();

        if (state.pollingState !== "IDLE") {
            this.logger.error(
                "startPoll: Attempt to poll when already started",
            );

            return;
        }

        await this.stateService.updatePollingState(true);
        this.startPoll();

        return;
    }

    @Cron(CronExpression.EVERY_DAY_AT_6AM)
    private async startPoll() {
        this.logger.info("startPoll");
        const state = await this.stateService.getState();

        await this.stateService.updatePollingState(true);

        const requestMethod = state.requestMethod;
        const siteProcessCount = this.config.get("siteProcessCount");

        while (true) {
            const sites = await this.siteService.getPaginated(
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

            await this.pollService.createManyBySiteId(
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
        await this.stateService.updatePollingState(false);
        await this.stateService.updateLastPollTime();

        this.logger.info("startPoll: ended");
    }
}
