/*
  Warnings:

  - Added the required column `lastPollTime` to the `OperationState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OperationState" ADD COLUMN     "lastPollTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "requestMethod" "EnumRequestMethod" NOT NULL DEFAULT 'GET';
