/*
  Warnings:

  - You are about to drop the `DataSourceTableOnUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DataSourceTableOnUser" DROP CONSTRAINT "DataSourceTableOnUser_dataSourceTableId_fkey";

-- DropForeignKey
ALTER TABLE "DataSourceTableOnUser" DROP CONSTRAINT "DataSourceTableOnUser_userId_fkey";

-- DropTable
DROP TABLE "DataSourceTableOnUser";

-- CreateTable
CREATE TABLE "_DataSourceTableToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DataSourceTableToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DataSourceTableToUser_B_index" ON "_DataSourceTableToUser"("B");

-- AddForeignKey
ALTER TABLE "_DataSourceTableToUser" ADD CONSTRAINT "_DataSourceTableToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "DataSourceTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSourceTableToUser" ADD CONSTRAINT "_DataSourceTableToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
