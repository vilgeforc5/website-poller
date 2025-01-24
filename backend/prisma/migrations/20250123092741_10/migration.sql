/*
  Warnings:

  - You are about to drop the column `lastFetched` on the `DataSourceTable` table. All the data in the column will be lost.
  - You are about to drop the column `updateTrigger` on the `DataSourceTable` table. All the data in the column will be lost.
  - You are about to drop the `_DataSourceTableToSite` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dataSourceTableParsingTaskId` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DataSourceTableToSite" DROP CONSTRAINT "_DataSourceTableToSite_A_fkey";

-- DropForeignKey
ALTER TABLE "_DataSourceTableToSite" DROP CONSTRAINT "_DataSourceTableToSite_B_fkey";

-- AlterTable
ALTER TABLE "DataSourceTable" DROP COLUMN "lastFetched",
DROP COLUMN "updateTrigger";

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "dataSourceTableParsingTaskId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_DataSourceTableToSite";

-- CreateTable
CREATE TABLE "DataSourceTableParsingTask" (
    "id" SERIAL NOT NULL,
    "dataSourceTableId" INTEGER NOT NULL,
    "updateTrigger" "UpdateTrigger" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),

    CONSTRAINT "DataSourceTableParsingTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_dataSourceTableParsingTaskId_fkey" FOREIGN KEY ("dataSourceTableParsingTaskId") REFERENCES "DataSourceTableParsingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSourceTableParsingTask" ADD CONSTRAINT "DataSourceTableParsingTask_dataSourceTableId_fkey" FOREIGN KEY ("dataSourceTableId") REFERENCES "DataSourceTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
