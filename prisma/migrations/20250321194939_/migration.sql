-- AlterTable
ALTER TABLE "order_products" ALTER COLUMN "observation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "observation" DROP NOT NULL;
