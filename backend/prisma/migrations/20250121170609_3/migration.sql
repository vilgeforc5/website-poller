/*
  Warnings:

  - You are about to drop the `Poll_Operation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Poll_Operation";

-- CreateTable
CREATE TABLE "PollingTask" (
    "id" SERIAL NOT NULL,
    "requestMethod" "EnumRequestMethod" NOT NULL DEFAULT 'GET',
    "pollingState" "PollingState" NOT NULL DEFAULT 'POLLING',
    "triggeredBy" "PollTrigger" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PollingTask_pkey" PRIMARY KEY ("id")
);
