"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
let ProductVariantsService = class ProductVariantsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createProductVariantDto) {
        return await this.prismaService.productVariant.create({
            data: {
                image: createProductVariantDto.image,
                name: createProductVariantDto.name,
                price: createProductVariantDto.price,
                status: createProductVariantDto.status,
                productId: createProductVariantDto.productId,
                productVariantCategoryId: createProductVariantDto.productVariantCategoryId,
            },
        });
    }
    async findAll() {
        return await this.prismaService.productVariant.findMany({
            include: {
                product: true,
                productVariantCategory: true,
            },
        });
    }
    async findOne(id) {
        return await this.prismaService.productVariant.findUnique({
            where: {
                id,
            },
            include: {
                product: true,
                productVariantCategory: true,
            },
        });
    }
    async update(id, updateProductVariantDto) {
        return await this.prismaService.productVariant.update({
            where: {
                id,
            },
            data: updateProductVariantDto,
        });
    }
    async remove(id) {
        return await this.prismaService.productVariant.delete({
            where: {
                id,
            },
        });
    }
};
exports.ProductVariantsService = ProductVariantsService;
exports.ProductVariantsService = ProductVariantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductVariantsService);
//# sourceMappingURL=product-variants.service.js.map