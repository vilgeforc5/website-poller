/*
  Warnings:

  - Changed the type of `chatId` on the `TelegramUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TelegramUser" DROP COLUMN "chatId",
ADD COLUMN     "chatId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_chatId_key" ON "TelegramUser"("chatId");
