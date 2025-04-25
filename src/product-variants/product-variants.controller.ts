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
  Query,
} from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { AdminGuard } from '../auth/auth.guard';
import { UpdateManyProductVariantDto } from './dto/update-many-product-variant.dto';

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

  @UseGuards(AdminGuard)
  @Post('batch')
  @HttpCode(201)
  async createMany(
    @Body()
    createProductVariantsDto: [CreateProductVariantDto],
  ) {
    return await this.productVariantsService.createMany(
      createProductVariantsDto,
    );
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('productVariantName') productVariantName: string,
  ) {
    return await this.productVariantsService.findAllPaginated({
      page: Number(page),
      perPage: Number(perPage),
      productVariantName,
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.productVariantsService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch('single/:id')
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
  @Patch('batch')
  @HttpCode(200)
  async updateMany(
    @Body()
    updateManyProductVariantDto: UpdateManyProductVariantDto & {
      ids: string[];
    },
  ) {
    const { ids, ...updateMany } = updateManyProductVariantDto;
    return await this.productVariantsService.updateMany(ids, updateMany);
  }

  @UseGuards(AdminGuard)
  @Delete('/single/:id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.productVariantsService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Delete('batch')
  @HttpCode(204)
  async removeMany(@Body('ids') ids: string[]) {
    return await this.productVariantsService.removeMany(ids);
  }
}
