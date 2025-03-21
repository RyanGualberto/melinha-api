-- Criar o enum no PostgreSQL (se ainda não existir)
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SHORTLY');
CREATE TYPE "ProductVariantStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SHORTLY');

-- Alterar a coluna 'status' da tabela 'products'
ALTER TABLE "products" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "status" TYPE "ProductStatus" USING "status"::text::"ProductStatus";
ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- Alterar a coluna 'status' da tabela 'product_variants'
ALTER TABLE "product_variants" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "product_variants" ALTER COLUMN "status" TYPE "ProductVariantStatus" USING "status"::text::"ProductVariantStatus";
ALTER TABLE "product_variants" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';