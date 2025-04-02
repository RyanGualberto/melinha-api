/*
  Warnings:

  - The values [UNIQUE] on the enum `ProductVariantCategoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductVariantCategoryType_new" AS ENUM ('SINGLE', 'MULTIPLE');
ALTER TABLE "product_variant_categories" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "product_variant_categories" ALTER COLUMN "type" TYPE "ProductVariantCategoryType_new" USING ("type"::text::"ProductVariantCategoryType_new");
ALTER TYPE "ProductVariantCategoryType" RENAME TO "ProductVariantCategoryType_old";
ALTER TYPE "ProductVariantCategoryType_new" RENAME TO "ProductVariantCategoryType";
DROP TYPE "ProductVariantCategoryType_old";
ALTER TABLE "product_variant_categories" ALTER COLUMN "type" SET DEFAULT 'MULTIPLE';
COMMIT;

-- AlterTable
ALTER TABLE "product_variant_categories" ADD COLUMN     "max" INTEGER;
