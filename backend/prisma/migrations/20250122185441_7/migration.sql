-- AlterTable
ALTER TABLE "DataSourceTable" ALTER COLUMN "lastFetched" DROP NOT NULL,
ALTER COLUMN "lastFetched" DROP DEFAULT;
