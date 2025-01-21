/*
  Warnings:

  - Changed the type of `statusCode` on the `Poll` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "statusCode",
ADD COLUMN     "statusCode" INTEGER NOT NULL;
