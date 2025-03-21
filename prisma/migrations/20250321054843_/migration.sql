/*
  Warnings:

  - You are about to drop the column `status` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `principal` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "status",
ADD COLUMN     "principal" BOOLEAN NOT NULL,
ALTER COLUMN "reference" DROP NOT NULL;
