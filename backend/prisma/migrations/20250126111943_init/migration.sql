-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_pollingTaskId_fkey";

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_pollingTaskId_fkey" FOREIGN KEY ("pollingTaskId") REFERENCES "PollingTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
