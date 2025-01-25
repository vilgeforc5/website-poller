import { WorkingState } from "@prisma/client";

export interface IDataSourceTableInfo {
    id: number;
    url: string;
    createdAt: string;
    lastPolled: string | null;
    users: string[];
    parsingTasks: IDataSourceTableParsinTask[];
}

export interface IDataSourceTableParsinTask {
    startTime: string;
    addedSites: string[];
    id: number;
    state: WorkingState;
    error: string | null;
}
