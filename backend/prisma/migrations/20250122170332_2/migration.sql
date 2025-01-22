/*
  Warnings:

  - Added the required column `pollingTaskId` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DataSourceTableProvider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "pollingTaskId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DataSourceTable" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "lastFetched" TIMESTAMP(3) NOT NULL,
    "provider" "DataSourceTableProvider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataSourceTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DataSourceTableToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DataSourceTableToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataSourceTable_url_key" ON "DataSourceTable"("url");

-- CreateIndex
CREATE INDEX "_DataSourceTableToUser_B_index" ON "_DataSourceTableToUser"("B");

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_pollingTaskId_fkey" FOREIGN KEY ("pollingTaskId") REFERENCES "PollingTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSourceTableToUser" ADD CONSTRAINT "_DataSourceTableToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "DataSourceTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSourceTableToUser" ADD CONSTRAINT "_DataSourceTableToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
