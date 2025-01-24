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
        data?: ResultData[][];
    }> {
        const res = await this.onBeforeStart(scopeInfo);

        if (!res.ok) {
            return res;
        }

        const data = [];

        while (true) {
            const chunk = await this.getChunk(this.processedCount, scopeInfo);

            if (chunk.length === 0) {
                break;
            }

            data.push(await this.processChunk(chunk, scopeInfo));
            this.processedCount += chunk.length;
        }

        this.processedCount = 0;

        return { ok: true, message: "Success", data };
    }
}
