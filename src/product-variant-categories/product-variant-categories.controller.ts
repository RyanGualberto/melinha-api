import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
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
  @HttpCode(201)
  async create(
    @Body() createProductVariantCategoryDto: CreateProductVariantCategoryDto,
  ) {
    return await this.productVariantCategoriesService.create(
      createProductVariantCategoryDto,
    );
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.productVariantCategoriesService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.productVariantCategoriesService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateProductVariantCategoryDto: UpdateProductVariantCategoryDto,
  ) {
    return await this.productVariantCategoriesService.update(
      id,
      updateProductVariantCategoryDto,
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.productVariantCategoriesService.remove(id);
  }
}
