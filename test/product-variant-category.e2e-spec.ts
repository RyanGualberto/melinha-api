import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { cleanDb } from './helpers/clean-database';
import { getUserToken } from './helpers/auth.helper';
import { userFactory } from './helpers/factories/user-factory';
import { productVariantCategoryFactory } from './helpers/factories/product-variant-category-factory';
import { faker } from '@faker-js/faker';
import { prisma } from './config/prisma.client';
import { App } from 'supertest/types';

describe('ProductVariantCaetegoriesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await cleanDb();
    await app.init();
  });

  it('/product-variant-categories (GET) - Deve retornar lista vazia inicialmente', async () => {
    const response = await request(app.getHttpServer()).get(
      '/product-variant-categories',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('/product-variant-categories (POST) - Deve criar uma categoria de variante de produto com admin', async () => {
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const variantData = {
      name: faker.commerce.productName(),
    };

    const response = await request(app.getHttpServer())
      .post('/product-variant-categories')
      .send(variantData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('/product-variant-categories (POST) - Deve falhar ao criar sem autenticação', async () => {
    const response = await request(app.getHttpServer())
      .post('/product-variant-categories')
      .send({
        name: faker.commerce.productName(),
      });

    expect(response.status).toBe(401);
  });

  it('/product-variant-categories/:id (GET) - Deve buscar uma categoria de variante pelo ID', async () => {
    const productVariantCategory = await productVariantCategoryFactory({});

    const response = await request(app.getHttpServer()).get(
      `/product-variant-categories/${productVariantCategory.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/product-variant-categories/:id (PATCH) - Deve atualizar uma categoria de variante com admin', async () => {
    const productVariantCategory = await productVariantCategoryFactory({});
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const updatedData = {
      name: 'Nova Variante',
    };

    const response = await request(app.getHttpServer())
      .patch(`/product-variant-categories/${productVariantCategory.id}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('/product-variant-categories/:id (PATCH) - Deve falhar ao atualizar sem autenticação', async () => {
    const productVariantCategory = await productVariantCategoryFactory({});

    const response = await request(app.getHttpServer())
      .patch(`/product-variant-categories/${productVariantCategory.id}`)
      .send({
        name: 'Variante Atualizada',
      });

    expect(response.status).toBe(401);
  });

  it('/product-variant-categories/:id (DELETE) - Deve deletar uma categoria de variante com admin', async () => {
    const variant = await productVariantCategoryFactory({});
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const response = await request(app.getHttpServer())
      .delete(`/product-variant-categories/${variant.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('/product-variant-categories/:id (DELETE) - Deve falhar ao deletar sem autenticação', async () => {
    const variant = await productVariantCategoryFactory();

    const response = await request(app.getHttpServer()).delete(
      `/product-variant-categories/${variant.id}`,
    );

    expect(response.status).toBe(401);
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
