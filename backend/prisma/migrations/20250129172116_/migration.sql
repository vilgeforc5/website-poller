/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `TelegramUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TelegramUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TelegramUser" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_userId_key" ON "TelegramUser"("userId");

-- AddForeignKey
ALTER TABLE "TelegramUser" ADD CONSTRAINT "TelegramUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
