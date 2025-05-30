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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantsController = void 0;
const common_1 = require("@nestjs/common");
const product_variants_service_1 = require("./product-variants.service");
const create_product_variant_dto_1 = require("./dto/create-product-variant.dto");
const update_product_variant_dto_1 = require("./dto/update-product-variant.dto");
const auth_guard_1 = require("../auth/auth.guard");
let ProductVariantsController = class ProductVariantsController {
    constructor(productVariantsService) {
        this.productVariantsService = productVariantsService;
    }
    async create(createProductVariantDto) {
        return await this.productVariantsService.create(createProductVariantDto);
    }
    async createMany(createProductVariantsDto) {
        return await this.productVariantsService.createMany(createProductVariantsDto);
    }
    async findAll(page, perPage, productVariantName) {
        return await this.productVariantsService.findAllPaginated({
            page: Number(page),
            perPage: Number(perPage),
            productVariantName,
        });
    }
    async findOne(id) {
        return await this.productVariantsService.findOne(id);
    }
    async update(id, updateProductVariantDto) {
        return await this.productVariantsService.update(id, updateProductVariantDto);
    }
    async updateMany(updateManyProductVariantDto) {
        const { ids, ...updateMany } = updateManyProductVariantDto;
        return await this.productVariantsService.updateMany(ids, updateMany);
    }
    async remove(id) {
        return await this.productVariantsService.remove(id);
    }
    async removeMany(ids) {
        return await this.productVariantsService.removeMany(ids);
    }
};
exports.ProductVariantsController = ProductVariantsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_variant_dto_1.CreateProductVariantDto]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)('batch'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('perPage')),
    __param(2, (0, common_1.Query)('productVariantName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)('single/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_variant_dto_1.UpdateProductVariantDto]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)('batch'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "updateMany", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Delete)('/single/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Delete)('batch'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductVariantsController.prototype, "removeMany", null);
exports.ProductVariantsController = ProductVariantsController = __decorate([
    (0, common_1.Controller)('product-variants'),
    __metadata("design:paramtypes", [product_variants_service_1.ProductVariantsService])
], ProductVariantsController);
//# sourceMappingURL=product-variants.controller.js.map