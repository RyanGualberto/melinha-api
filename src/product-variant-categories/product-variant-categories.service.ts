import { Injectable } from '@nestjs/common';
import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';

@Injectable()
export class ProductVariantCategoriesService {
  create(createProductVariantCategoryDto: CreateProductVariantCategoryDto) {
    return 'This action adds a new productVariantCategory';
  }

  findAll() {
    return `This action returns all productVariantCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariantCategory`;
  }

  update(id: number, updateProductVariantCategoryDto: UpdateProductVariantCategoryDto) {
    return `This action updates a #${id} productVariantCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productVariantCategory`;
  }
}
