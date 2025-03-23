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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
let AddressService = class AddressService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createAddressDto, userId) {
        if (createAddressDto.principal) {
            await this.setPrincipalAddress(userId, null);
        }
        return this.prismaService.address.create({
            data: {
                ...createAddressDto,
                userId,
            },
        });
    }
    async findAll(userId) {
        return await this.prismaService.address.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id, userId) {
        return await this.prismaService.address.findFirst({
            where: {
                id,
                userId,
            },
        });
    }
    async update(id, userId, updateAddressDto) {
        if (updateAddressDto.principal) {
            await this.setPrincipalAddress(userId, id);
        }
        return await this.prismaService.address.update({
            where: {
                id,
                userId,
            },
            data: {
                ...updateAddressDto,
            },
        });
    }
    async remove(id, userId) {
        return await this.prismaService.address.delete({
            where: {
                id,
                userId,
            },
        });
    }
    async setPrincipalAddress(userId, addressId) {
        await this.prismaService.address.updateMany({
            where: {
                userId,
                principal: true,
            },
            data: {
                principal: false,
            },
        });
        if (addressId)
            await this.prismaService.address.update({
                where: {
                    id: addressId,
                },
                data: {
                    principal: true,
                },
            });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
//# sourceMappingURL=address.service.js.map