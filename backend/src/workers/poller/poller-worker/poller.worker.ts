import { ChunkWorker } from "src/workers/chunk-worker/chunk-worker";
import { SiteService } from "src/layers/site/site.service";
import { EnumRequestMethod } from "@prisma/client";
import {
    catchError,
    concatMap,
    from,
    map,
    mergeMap,
    Observable,
    of,
    retryWhen,
    tap,
    throwError,
    timer,
    toArray,
} from "rxjs";
import { AxiosResponse } from "axios";
import { HttpService } from "@nestjs/axios";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";
import { Injectable } from "@nestjs/common";

interface PollerWorkerProcessedData {
    status: number;
    url: string;
    retryCount: number;
}

interface PollerWorkerSourceData {
    id: number;
    address: string;
    createdAt: Date;
}

interface PollerWorkerScope {
    pollingTaskId: number;
    userId: number;
    requestMethod: EnumRequestMethod;
    parallelProcessCount: number;
    retryCount: number;
}

@Injectable()
export class PollerWorker extends ChunkWorker<
    PollerWorkerSourceData,
    any,
    PollerWorkerScope
> {
    constructor(
        private readonly siteService: SiteService,
        private readonly httpService: HttpService,
        private readonly pollingTaskService: PollingTaskService,
    ) {
        super();
    }

    private pollWebsites(
        addressList: string[],
        method: EnumRequestMethod = "HEAD",
        retryCountConfig: number = 5,
    ): Observable<Array<PollerWorkerProcessedData>> {
        const axiosMethodMap: Record<EnumRequestMethod, string> = {
            GET: "get",
            HEAD: "head",
            // TODO implement ping method
            PING: "head",
        };

        const handleRequest = (url: string) => {
            let retryCount = 0;

            return from(
                this.httpService[axiosMethodMap[method]](url, {
                    timeout: 2000,
                }).pipe(
                    map((response: AxiosResponse) => ({
                        url,
                        status: response.status,
                        retryCount,
                    })),
                    tap((data) => {
                        console.log(data);
                    }),
                    retryWhen((errors) =>
                        errors.pipe(
                            concatMap((error, i) => {
                                if (i < retryCountConfig) {
                                    retryCount++;
                                    return timer(250);
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
                        return of({ url, status, retryCount });
                    }),
                ),
            );
        };

        return from(addressList).pipe(
            mergeMap((url) => handleRequest(url)),
            toArray(),
        );
    }

    getChunk(
        processedCount: number,
        { userId, parallelProcessCount }: PollerWorkerScope,
    ) {
        return this.siteService.getPaginated(
            userId,
            processedCount,
            parallelProcessCount,
        );
    }

    async processChunk(
        sites: PollerWorkerSourceData[],
        { requestMethod, pollingTaskId, retryCount }: PollerWorkerScope,
    ) {
        return new Promise((res) => {
            this.pollWebsites(
                sites.map((site) => site.address),
                requestMethod,
                retryCount,
            ).subscribe(async (poll) => {
                const polls = poll
                    .map((data) => {
                        const targetSite = sites.find(
                            (site) => site.address === data.url,
                        );

                        if (!targetSite) {
                            return undefined;
                        }

                        return {
                            siteId: targetSite.id,
                            statusCode: data.status,
                            retryCount: data.retryCount,
                            requestMethod,
                        };
                    })
                    .filter((poll) => !!poll);

                await this.pollingTaskService.update(pollingTaskId, { polls });

                res(undefined);
            });
        });
    }
}
