/*
  Warnings:

  - You are about to drop the `UserOnSite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnSite" DROP CONSTRAINT "UserOnSite_siteId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnSite" DROP CONSTRAINT "UserOnSite_userId_fkey";

-- DropTable
DROP TABLE "UserOnSite";

-- CreateTable
CREATE TABLE "_SiteToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SiteToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SiteToUser_B_index" ON "_SiteToUser"("B");

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
