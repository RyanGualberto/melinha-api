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
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { AdminGuard } from '../auth/auth.guard';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  @HttpCode(201)
  async create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return await this.productVariantsService.create(createProductVariantDto);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.productVariantsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.productVariantsService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return await this.productVariantsService.update(
      id,
      updateProductVariantDto,
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.productVariantsService.remove(id);
  }
}
