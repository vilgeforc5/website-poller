export interface IDataSourceTableInfo {
    url: string;
    createdAt: string;
    lastPolled: string | null;
    users: string[];
    parsingTasks: { startTime: string; addedSites: string[]; id: number }[];
}
