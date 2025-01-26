export interface ISiteLatestInfo {
    count: number;
    diffFromYesterday: number;
    lastCreatedTime: string | null;
}

export interface ISiteInfo {
    id: number;
    address: string;
    createdAt: Date;
    polls: any[];
    users: { email: string }[];
}
