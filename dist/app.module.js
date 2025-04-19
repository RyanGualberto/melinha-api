"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const product_variants_module_1 = require("./product-variants/product-variants.module");
const product_variant_categories_module_1 = require("./product-variant-categories/product-variant-categories.module");
const menu_module_1 = require("./menu/menu.module");
const settings_module_1 = require("./settings/settings.module");
const address_module_1 = require("./address/address.module");
const orders_module_1 = require("./orders/orders.module");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const use_logging_1 = require("./config/use-logging");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(use_logging_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                },
                defaults: {
                    from: '"Melinha Açaíteria" <no-reply@melinhaacaiteria.com>',
                },
                template: {
                    dir: (0, path_1.join)(__dirname, '..', 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            product_variants_module_1.ProductVariantsModule,
            product_variant_categories_module_1.ProductVariantCategoriesModule,
            menu_module_1.MenuModule,
            settings_module_1.SettingsModule,
            address_module_1.AddressModule,
            orders_module_1.OrdersModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map