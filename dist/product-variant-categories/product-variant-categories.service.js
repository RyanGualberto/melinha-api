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
exports.ProductVariantCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
let ProductVariantCategoriesService = class ProductVariantCategoriesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createProductVariantCategoryDto) {
        return await this.prismaService.productVariantCategory.create({
            data: {
                ...createProductVariantCategoryDto,
                max: createProductVariantCategoryDto.max || null,
            },
        });
    }
    async findAll() {
        return await this.prismaService.productVariantCategory.findMany({
            select: {
                id: true,
                max: true,
                name: true,
                type: true,
            },
        });
    }
    async findOne(id) {
        return await this.prismaService.productVariantCategory.findUnique({
            where: { id },
            select: {
                id: true,
                max: true,
                name: true,
                type: true,
            },
        });
    }
    async update(id, updateProductVariantCategoryDto) {
        await this.prismaService.productVariantCategory.update({
            where: { id },
            data: {
                ...updateProductVariantCategoryDto,
                max: updateProductVariantCategoryDto.max || null,
            },
        });
    }
    async remove(id) {
        return await this.prismaService.productVariantCategory.delete({
            where: { id },
        });
    }
};
exports.ProductVariantCategoriesService = ProductVariantCategoriesService;
exports.ProductVariantCategoriesService = ProductVariantCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductVariantCategoriesService);
//# sourceMappingURL=product-variant-categories.service.js.map