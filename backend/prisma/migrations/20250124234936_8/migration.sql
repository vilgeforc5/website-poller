/*
  Warnings:

  - Made the column `dataSourceTableId` on table `DataSourceTableParsingTask` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DataSourceTableParsingTask" ALTER COLUMN "dataSourceTableId" SET NOT NULL;
