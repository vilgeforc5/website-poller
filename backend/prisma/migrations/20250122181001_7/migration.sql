-- AlterTable
ALTER TABLE "DataSourceTable" ALTER COLUMN "lastFetched" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updateTrigger" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_DataSourceTableToSite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DataSourceTableToSite_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DataSourceTableToSite_B_index" ON "_DataSourceTableToSite"("B");

-- AddForeignKey
ALTER TABLE "_DataSourceTableToSite" ADD CONSTRAINT "_DataSourceTableToSite_A_fkey" FOREIGN KEY ("A") REFERENCES "DataSourceTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSourceTableToSite" ADD CONSTRAINT "_DataSourceTableToSite_B_fkey" FOREIGN KEY ("B") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
