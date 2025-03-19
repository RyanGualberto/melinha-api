import { Module } from '@nestjs/common';
import { ProductVariantCategoriesService } from './product-variant-categories.service';
import { ProductVariantCategoriesController } from './product-variant-categories.controller';

@Module({
  controllers: [ProductVariantCategoriesController],
  providers: [ProductVariantCategoriesService],
})
export class ProductVariantCategoriesModule {}
