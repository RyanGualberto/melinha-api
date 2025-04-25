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
    async createMany(createProductVariantDto) {
        return await this.prismaService.productVariant.createMany({
            data: createProductVariantDto,
        });
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
    async findAllPaginated({ page = 0, perPage = 10, productVariantName, }) {
        const skip = page * perPage;
        const where = productVariantName
            ? {
                OR: [
                    {
                        name: { contains: productVariantName, mode: 'insensitive' },
                    },
                ],
            }
            : undefined;
        const productVariants = await this.prismaService.productVariant.findMany({
            where: where,
            skip,
            take: perPage,
            select: {
                id: true,
                image: true,
                name: true,
                price: true,
                status: true,
                product: {
                    select: {
                        title: true,
                    },
                },
                productVariantCategoryId: true,
                productId: true,
                productVariantCategory: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        const aggregates = await this.prismaService.productVariant.aggregate({
            where,
            _count: true,
        });
        return {
            data: productVariants,
            pagination: {
                page,
                perPage,
                total: aggregates._count,
            },
        };
    }
    async findOne(id) {
        return await this.prismaService.productVariant.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                image: true,
                name: true,
                price: true,
                status: true,
                product: {
                    select: {
                        title: true,
                    },
                },
                productVariantCategory: {
                    select: {
                        name: true,
                    },
                },
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
    async updateMany(ids, updateProductVariantDto) {
        return await this.prismaService.productVariant.updateMany({
            where: {
                id: {
                    in: ids,
                },
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
    async removeMany(ids) {
        return await this.prismaService.productVariant.deleteMany({
            where: {
                id: {
                    in: ids,
                },
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