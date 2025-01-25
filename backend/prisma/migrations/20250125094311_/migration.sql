-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_dataSourceTableParsingTaskId_fkey";

-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "dataSourceTableParsingTaskId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_dataSourceTableParsingTaskId_fkey" FOREIGN KEY ("dataSourceTableParsingTaskId") REFERENCES "DataSourceTableParsingTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;
