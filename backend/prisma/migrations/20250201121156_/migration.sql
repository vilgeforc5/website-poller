-- CreateEnum
CREATE TYPE "ScheduleJobType" AS ENUM ('POLL', 'PARSE', 'TELEGRAM_INFO');

-- DropForeignKey
ALTER TABLE "TelegramUser" DROP CONSTRAINT "TelegramUser_userId_fkey";

-- CreateTable
CREATE TABLE "ScheduleJob" (
    "id" SERIAL NOT NULL,
    "type" "ScheduleJobType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ScheduleJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleJob_userId_key" ON "ScheduleJob"("userId");

-- AddForeignKey
ALTER TABLE "ScheduleJob" ADD CONSTRAINT "ScheduleJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramUser" ADD CONSTRAINT "TelegramUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
