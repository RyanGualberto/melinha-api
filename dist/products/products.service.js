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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
let ProductsService = class ProductsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createProductDto) {
        return await this.prismaService.product.create({
            data: {
                description: createProductDto.description,
                image: createProductDto.image,
                price: createProductDto.price,
                status: createProductDto.status,
                title: createProductDto.title,
                categoryId: createProductDto.categoryId,
            },
        });
    }
    async findAll() {
        return await this.prismaService.product.findMany({
            select: {
                id: true,
                image: true,
                title: true,
                cost: true,
                price: true,
                status: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        description: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        return await this.prismaService.product.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                image: true,
                title: true,
                cost: true,
                price: true,
                status: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        description: true,
                    },
                },
            },
        });
    }
    async update(id, updateProductDto) {
        return await this.prismaService.product.update({
            where: {
                id,
            },
            data: {
                ...updateProductDto,
            },
        });
    }
    async updateOrder(updateProductOrderDto) {
        const promises = updateProductOrderDto.map((product) => {
            return this.prismaService.product.update({
                where: {
                    id: product.id,
                },
                data: {
                    index: product.index,
                },
            });
        });
        return await Promise.all(promises);
    }
    async remove(id) {
        return await this.prismaService.product.delete({
            where: {
                id,
            },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map