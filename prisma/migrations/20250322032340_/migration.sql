/*
  Warnings:

  - Added the required column `orderMinimum` to the `store_settings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `opened` on the `store_settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "store_settings" ADD COLUMN     "orderMinimum" DOUBLE PRECISION NOT NULL,
DROP COLUMN "opened",
ADD COLUMN     "opened" BOOLEAN NOT NULL;
