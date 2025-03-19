import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantCategoryDto } from './create-product-variant-category.dto';

export class UpdateProductVariantCategoryDto extends PartialType(CreateProductVariantCategoryDto) {}
