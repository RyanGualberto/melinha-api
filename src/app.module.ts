import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductVariantCategoriesModule } from './product-variant-categories/product-variant-categories.module';
import { MenuModule } from './menu/menu.module';
import { SettingsModule } from './settings/settings.module';
import { AddressModule } from './address/address.module';
import { OrdersModule } from './orders/orders.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MailModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ProductVariantsModule,
    ProductVariantCategoriesModule,
    MenuModule,
    SettingsModule,
    AddressModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
