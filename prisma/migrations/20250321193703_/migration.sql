/*
  Warnings:

  - Added the required column `observation` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_products" ADD COLUMN     "observation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "observation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_variants" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "status" DROP DEFAULT;
