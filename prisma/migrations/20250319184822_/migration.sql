/*
  Warnings:

  - Added the required column `image` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "image" TEXT NOT NULL;
