/*
  Warnings:

  - You are about to drop the `_DataSourceTableToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DataSourceTableToUser" DROP CONSTRAINT "_DataSourceTableToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_DataSourceTableToUser" DROP CONSTRAINT "_DataSourceTableToUser_B_fkey";

-- DropTable
DROP TABLE "_DataSourceTableToUser";

-- CreateTable
CREATE TABLE "DataSourceTableOnUser" (
    "userId" INTEGER NOT NULL,
    "dataSourceTableId" INTEGER NOT NULL,

    CONSTRAINT "DataSourceTableOnUser_pkey" PRIMARY KEY ("userId","dataSourceTableId")
);

-- AddForeignKey
ALTER TABLE "DataSourceTableOnUser" ADD CONSTRAINT "DataSourceTableOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSourceTableOnUser" ADD CONSTRAINT "DataSourceTableOnUser_dataSourceTableId_fkey" FOREIGN KEY ("dataSourceTableId") REFERENCES "DataSourceTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
