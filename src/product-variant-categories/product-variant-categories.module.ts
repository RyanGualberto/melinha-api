import { Module } from '@nestjs/common';
import { ProductVariantCategoriesService } from './product-variant-categories.service';
import { ProductVariantCategoriesController } from './product-variant-categories.controller';
import { PrismaService } from '../config/prisma-service';

@Module({
  controllers: [ProductVariantCategoriesController],
  providers: [ProductVariantCategoriesService, PrismaService],
})
export class ProductVariantCategoriesModule {}
