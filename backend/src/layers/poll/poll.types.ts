export interface IPollLatestInfo {
    positiveCodePercent: number;
    diffFromYesterday: number;
}

export type TPollCodeInfo = {
    date: string;
    200: number;
    300: number;
    400: number;
    500: number;
}[];
