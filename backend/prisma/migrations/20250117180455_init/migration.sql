-- CreateEnum
CREATE TYPE "PollingState" AS ENUM ('IDLE', 'POLLING');

-- CreateEnum
CREATE TYPE "EnumRequestMethod" AS ENUM ('GET', 'HEAD', 'PING');

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "statusCode" TEXT NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "requestMethod" "EnumRequestMethod" NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationState" (
    "id" TEXT NOT NULL,
    "pollingState" "PollingState" NOT NULL,

    CONSTRAINT "OperationState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Site_address_key" ON "Site"("address");

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
