/*
  Warnings:

  - The `deliveryTime` column on the `store_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "store_settings" DROP COLUMN "deliveryTime",
ADD COLUMN     "deliveryTime" INTEGER NOT NULL DEFAULT 30;
