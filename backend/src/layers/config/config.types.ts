import { JsonValue } from "@prisma/client/runtime/library";
import { EnumRequestMethod } from "@prisma/client";

export type IConfig = {
    retryCount: number;
    headers?: JsonValue;
    parallelSitesCount: number;
    requestMethod: EnumRequestMethod;
};
