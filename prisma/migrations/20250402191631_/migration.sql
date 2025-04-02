-- CreateEnum
CREATE TYPE "ProductVariantCategoryType" AS ENUM ('UNIQUE', 'MULTIPLE');

-- AlterTable
ALTER TABLE "product_variant_categories" ADD COLUMN     "type" "ProductVariantCategoryType" NOT NULL DEFAULT 'MULTIPLE';
