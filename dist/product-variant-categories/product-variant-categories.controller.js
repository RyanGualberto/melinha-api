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
exports.ProductVariantCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const product_variant_categories_service_1 = require("./product-variant-categories.service");
const create_product_variant_category_dto_1 = require("./dto/create-product-variant-category.dto");
const update_product_variant_category_dto_1 = require("./dto/update-product-variant-category.dto");
const auth_guard_1 = require("../auth/auth.guard");
let ProductVariantCategoriesController = class ProductVariantCategoriesController {
    constructor(productVariantCategoriesService) {
        this.productVariantCategoriesService = productVariantCategoriesService;
    }
    async create(createProductVariantCategoryDto) {
        return await this.productVariantCategoriesService.create(createProductVariantCategoryDto);
    }
    async findAll() {
        return await this.productVariantCategoriesService.findAll();
    }
    async findOne(id) {
        return await this.productVariantCategoriesService.findOne(id);
    }
    async update(id, updateProductVariantCategoryDto) {
        return await this.productVariantCategoriesService.update(id, updateProductVariantCategoryDto);
    }
    async remove(id) {
        return await this.productVariantCategoriesService.remove(id);
    }
};
exports.ProductVariantCategoriesController = ProductVariantCategoriesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_variant_category_dto_1.CreateProductVariantCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductVariantCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductVariantCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_variant_category_dto_1.UpdateProductVariantCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductVariantCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantCategoriesController.prototype, "remove", null);
exports.ProductVariantCategoriesController = ProductVariantCategoriesController = __decorate([
    (0, common_1.Controller)('product-variant-categories'),
    __metadata("design:paramtypes", [product_variant_categories_service_1.ProductVariantCategoriesService])
], ProductVariantCategoriesController);
//# sourceMappingURL=product-variant-categories.controller.js.map