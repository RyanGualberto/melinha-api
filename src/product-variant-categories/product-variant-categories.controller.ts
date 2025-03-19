import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductVariantCategoriesService } from './product-variant-categories.service';
import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
import { AdminGuard } from '../auth/auth.guard';

@Controller('product-variant-categories')
export class ProductVariantCategoriesController {
  constructor(
    private readonly productVariantCategoriesService: ProductVariantCategoriesService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createProductVariantCategoryDto: CreateProductVariantCategoryDto,
  ) {
    return this.productVariantCategoriesService.create(
      createProductVariantCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.productVariantCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantCategoriesService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariantCategoryDto: UpdateProductVariantCategoryDto,
  ) {
    return this.productVariantCategoriesService.update(
      +id,
      updateProductVariantCategoryDto,
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantCategoriesService.remove(+id);
  }
}
