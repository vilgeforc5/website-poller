/*
  Warnings:

  - You are about to drop the column `pollingState` on the `DataSourceTableParsingTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DataSourceTableParsingTask" DROP COLUMN "pollingState",
ADD COLUMN     "workingState" "WorkingState" NOT NULL DEFAULT 'RUNNING';
