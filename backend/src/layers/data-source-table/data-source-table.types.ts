import { UpdateTrigger, WorkingState } from "@prisma/client";

export interface IDataSourceTableInfo {
    id: number;
    url: string;
    createdAt: string;
    lastPolled: string | null;
    users: string[];
    parsingTasks: IDataSourceTableParsingTask[];
}

export interface IDataSourceTableParsingTask {
    startTime: string;
    addedSites: string[];
    id: number;
    state: WorkingState;
    updateTrigger: UpdateTrigger;
    error: string | null;
}
