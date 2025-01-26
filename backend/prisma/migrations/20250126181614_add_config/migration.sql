-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_siteId_fkey";

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 5,
    "headers" JSONB NOT NULL,
    "pollPerDay" INTEGER NOT NULL DEFAULT 5,
    "parallelSitesCount" INTEGER NOT NULL DEFAULT 10,
    "parsePerDay" INTEGER NOT NULL DEFAULT 5,
    "requestMethod" "EnumRequestMethod" NOT NULL DEFAULT 'GET',

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
