import { EnumRequestMethod } from "@prisma/client";

export interface ISiteLatestInfo {
    count: number;
    diffFromYesterday: number;
    lastCreatedTime: string | null;
}

export interface ISiteInfo {
    id: number;
    address: string;
    createdAt: Date;
    polls: Array<{
        id: number;
        statusCode: number;
        retryCount: number;
        requestMethod: EnumRequestMethod;
        createdAt: Date;
    }>;
    lastStatusCode?: number;
    users: { email: string }[];
}
