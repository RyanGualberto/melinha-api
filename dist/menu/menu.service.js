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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../config/prisma-service");
let MenuService = class MenuService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getMenu(query) {
        const categories = await this.prismaService.category.findMany({
            include: {
                products: {
                    where: {
                        status: {
                            not: client_1.ProductStatus.INACTIVE,
                        },
                        title: { contains: query, mode: 'insensitive' },
                    },
                    include: {
                        productVariants: {
                            where: {
                                status: {
                                    not: client_1.ProductStatus.INACTIVE,
                                },
                            },
                            include: {
                                productVariantCategory: true,
                            },
                        },
                    },
                },
            },
        });
        return { categories };
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenuService);
//# sourceMappingURL=menu.service.js.map