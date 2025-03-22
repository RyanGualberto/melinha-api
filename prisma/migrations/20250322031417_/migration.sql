/*
  Warnings:

  - Added the required column `deliveryTime` to the `store_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opened` to the `store_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "deliveryTime" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "store_settings" ADD COLUMN     "deliveryTime" TEXT NOT NULL,
ADD COLUMN     "opened" TEXT NOT NULL;
