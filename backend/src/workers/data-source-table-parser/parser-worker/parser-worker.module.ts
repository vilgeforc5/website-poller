import { Module } from "@nestjs/common";
import { ParserWorkerService } from "src/workers/data-source-table-parser/parser-worker/parser-worker.service";
import { SiteModule } from "src/layers/site/site.module";

@Module({
    imports: [SiteModule],
    providers: [ParserWorkerService],
    exports: [ParserWorkerService],
})
export class ParserWorkerModule {}
