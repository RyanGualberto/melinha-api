/*
  Warnings:

  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "settings";

-- CreateTable
CREATE TABLE "store_settings" (
    "id" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "store_settings_pkey" PRIMARY KEY ("id")
);
