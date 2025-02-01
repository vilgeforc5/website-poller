/*
  Warnings:

  - The values [TELEGRAM_INFO] on the enum `ScheduleJobType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `cronStr` to the `ScheduleJob` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScheduleJobStatus" AS ENUM ('SCHEDULED', 'STOPPED');

-- AlterEnum
BEGIN;
CREATE TYPE "ScheduleJobType_new" AS ENUM ('POLL', 'PARSE', 'TELEGRAM_TODAY_INFO');
ALTER TABLE "ScheduleJob" ALTER COLUMN "type" TYPE "ScheduleJobType_new" USING ("type"::text::"ScheduleJobType_new");
ALTER TYPE "ScheduleJobType" RENAME TO "ScheduleJobType_old";
ALTER TYPE "ScheduleJobType_new" RENAME TO "ScheduleJobType";
DROP TYPE "ScheduleJobType_old";
COMMIT;

-- AlterTable
ALTER TABLE "ScheduleJob" ADD COLUMN     "cronStr" TEXT NOT NULL,
ADD COLUMN     "status" "ScheduleJobStatus" NOT NULL DEFAULT 'STOPPED',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'Europe/Moscow';
