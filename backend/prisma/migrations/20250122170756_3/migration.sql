/*
  Warnings:

  - Added the required column `triggeredBy` to the `DataSourceTable` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `triggeredBy` on the `PollingTask` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UpdateTrigger" AS ENUM ('MANUAL', 'SCHEDULE');

-- AlterTable
ALTER TABLE "DataSourceTable" ADD COLUMN     "triggeredBy" "UpdateTrigger" NOT NULL;

-- AlterTable
ALTER TABLE "PollingTask" DROP COLUMN "triggeredBy",
ADD COLUMN     "triggeredBy" "UpdateTrigger" NOT NULL;

-- DropEnum
DROP TYPE "PollTrigger";
