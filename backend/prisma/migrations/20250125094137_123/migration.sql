-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_pollingTaskId_fkey";

-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_siteId_fkey";

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_pollingTaskId_fkey" FOREIGN KEY ("pollingTaskId") REFERENCES "PollingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
