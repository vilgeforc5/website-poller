export abstract class ChunkWorker<
    SourceData = unknown,
    ResultData = unknown,
    ScopeInfo = any,
> {
    constructor() {}
    private processedCount = 0;

    abstract getChunk(
        processedCount: number,
        scope: ScopeInfo,
    ): Promise<SourceData[]>;

    abstract processChunk(
        data: SourceData[],
        scope: ScopeInfo,
    ): Promise<ResultData>;

    async onBeforeStart(
        _scope: ScopeInfo,
    ): Promise<{ ok: boolean; message?: string }> {
        return { ok: true };
    }

    async work(scopeInfo: ScopeInfo): Promise<{
        ok: boolean;
        message?: string;
        data?: Array<ResultData>;
    }> {
        const res = await this.onBeforeStart(scopeInfo);

        if (!res.ok) {
            return res;
        }

        const data: ResultData[] = [];

        while (true) {
            const chunk = await this.getChunk(this.processedCount, scopeInfo);
            console.log(chunk);
            if (chunk.length === 0) {
                break;
            }

            const processedChunk = await this.processChunk(chunk, scopeInfo);

            data.push(processedChunk);
            this.processedCount += chunk.length;
        }

        this.processedCount = 0;

        return { ok: true, message: "Success", data };
    }
}
