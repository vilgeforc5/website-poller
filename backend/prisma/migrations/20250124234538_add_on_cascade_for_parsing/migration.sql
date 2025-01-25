-- DropForeignKey
ALTER TABLE "DataSourceTableParsingTask" DROP CONSTRAINT "DataSourceTableParsingTask_dataSourceTableId_fkey";

-- AlterTable
ALTER TABLE "DataSourceTableParsingTask" ALTER COLUMN "dataSourceTableId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DataSourceTableParsingTask" ADD CONSTRAINT "DataSourceTableParsingTask_dataSourceTableId_fkey" FOREIGN KEY ("dataSourceTableId") REFERENCES "DataSourceTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
