-- DropForeignKey
ALTER TABLE "DataSourceTableParsingTask" DROP CONSTRAINT "DataSourceTableParsingTask_dataSourceTableId_fkey";

-- AddForeignKey
ALTER TABLE "DataSourceTableParsingTask" ADD CONSTRAINT "DataSourceTableParsingTask_dataSourceTableId_fkey" FOREIGN KEY ("dataSourceTableId") REFERENCES "DataSourceTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
