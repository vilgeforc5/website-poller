/*
  Warnings:

  - Added the required column `googleSpreadSheetId` to the `DataSourceTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataSourceTable" ADD COLUMN     "googleSpreadSheetId" TEXT NOT NULL;
