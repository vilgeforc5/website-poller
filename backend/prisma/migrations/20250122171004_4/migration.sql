/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DataSourceTable` table. All the data in the column will be lost.
  - You are about to drop the column `triggeredBy` on the `DataSourceTable` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DataSourceTable` table. All the data in the column will be lost.
  - You are about to drop the column `triggeredBy` on the `PollingTask` table. All the data in the column will be lost.
  - Added the required column `updateTrigger` to the `DataSourceTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateTrigger` to the `PollingTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataSourceTable" DROP COLUMN "createdAt",
DROP COLUMN "triggeredBy",
DROP COLUMN "updatedAt",
ADD COLUMN     "updateTrigger" "UpdateTrigger" NOT NULL;

-- AlterTable
ALTER TABLE "PollingTask" DROP COLUMN "triggeredBy",
ADD COLUMN     "updateTrigger" "UpdateTrigger" NOT NULL;
