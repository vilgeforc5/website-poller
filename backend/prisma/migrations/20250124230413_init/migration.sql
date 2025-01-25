-- CreateEnum
CREATE TYPE "DataSourceTableProvider" AS ENUM ('GOOGLE');

-- CreateEnum
CREATE TYPE "UpdateTrigger" AS ENUM ('MANUAL', 'SCHEDULE');

-- CreateEnum
CREATE TYPE "WorkingState" AS ENUM ('IDLE', 'RUNNING');

-- CreateEnum
CREATE TYPE "EnumRequestMethod" AS ENUM ('GET', 'HEAD', 'PING');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataSourceTableParsingTaskId" INTEGER NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" SERIAL NOT NULL,
    "siteId" INTEGER NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "requestMethod" "EnumRequestMethod" NOT NULL,
    "pollingTaskId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollingTask" (
    "id" SERIAL NOT NULL,
    "requestMethod" "EnumRequestMethod" NOT NULL DEFAULT 'GET',
    "pollingState" "WorkingState" NOT NULL DEFAULT 'RUNNING',
    "updateTrigger" "UpdateTrigger" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "error" TEXT,

    CONSTRAINT "PollingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSourceTable" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "provider" "DataSourceTableProvider" NOT NULL DEFAULT 'GOOGLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "googleSpreadSheetId" TEXT NOT NULL,

    CONSTRAINT "DataSourceTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSourceTableParsingTask" (
    "id" SERIAL NOT NULL,
    "dataSourceTableId" INTEGER NOT NULL,
    "pollingState" "WorkingState" NOT NULL DEFAULT 'IDLE',
    "updateTrigger" "UpdateTrigger" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "error" TEXT,

    CONSTRAINT "DataSourceTableParsingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SiteToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SiteToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DataSourceTableToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DataSourceTableToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Site_address_key" ON "Site"("address");

-- CreateIndex
CREATE UNIQUE INDEX "DataSourceTable_url_key" ON "DataSourceTable"("url");

-- CreateIndex
CREATE INDEX "_SiteToUser_B_index" ON "_SiteToUser"("B");

-- CreateIndex
CREATE INDEX "_DataSourceTableToUser_B_index" ON "_DataSourceTableToUser"("B");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_dataSourceTableParsingTaskId_fkey" FOREIGN KEY ("dataSourceTableParsingTaskId") REFERENCES "DataSourceTableParsingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_pollingTaskId_fkey" FOREIGN KEY ("pollingTaskId") REFERENCES "PollingTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSourceTableParsingTask" ADD CONSTRAINT "DataSourceTableParsingTask_dataSourceTableId_fkey" FOREIGN KEY ("dataSourceTableId") REFERENCES "DataSourceTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSourceTableToUser" ADD CONSTRAINT "_DataSourceTableToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "DataSourceTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSourceTableToUser" ADD CONSTRAINT "_DataSourceTableToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
