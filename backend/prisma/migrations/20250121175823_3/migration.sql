/*
  Warnings:

  - The values [POLLING] on the enum `PollingState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PollingState_new" AS ENUM ('IDLE', 'RUNNING');
ALTER TABLE "PollingTask" ALTER COLUMN "pollingState" DROP DEFAULT;
ALTER TABLE "PollingTask" ALTER COLUMN "pollingState" TYPE "PollingState_new" USING ("pollingState"::text::"PollingState_new");
ALTER TYPE "PollingState" RENAME TO "PollingState_old";
ALTER TYPE "PollingState_new" RENAME TO "PollingState";
DROP TYPE "PollingState_old";
ALTER TABLE "PollingTask" ALTER COLUMN "pollingState" SET DEFAULT 'RUNNING';
COMMIT;

-- AlterTable
ALTER TABLE "PollingTask" ALTER COLUMN "pollingState" SET DEFAULT 'RUNNING',
ALTER COLUMN "endTime" DROP NOT NULL;
