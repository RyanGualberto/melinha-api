import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { cleanDb } from './helpers/clean-database';
import { getUserToken } from './helpers/auth.helper';
import { userFactory } from './helpers/factories/user-factory';
import { productVariantFactory } from './helpers/factories/product-variant-factory';
import { productFactory } from './helpers/factories/product-factory';
import { faker } from '@faker-js/faker';
import { prisma } from './config/prisma.client';

describe('ProductVariantsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await cleanDb();
    await app.init();
  });

  it('/product-variants (GET) - Deve retornar lista vazia inicialmente', async () => {
    const response = await request(app.getHttpServer()).get(
      '/product-variants',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('/product-variants (POST) - Deve criar uma variante de produto com admin', async () => {
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);
    const product = await productFactory();

    const variantData = {
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 10, max: 100 }),
      status: 'active',
      productId: product.id,
      image: faker.image.url(),
    };

    const response = await request(app.getHttpServer())
      .post('/product-variants')
      .send(variantData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('/product-variants (POST) - Deve falhar ao criar sem autenticação', async () => {
    const product = await productFactory();

    const response = await request(app.getHttpServer())
      .post('/product-variants')
      .send({
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 10, max: 100 }),
        status: 'active',
        productId: product.id,
        image: faker.image.url(),
      });

    expect(response.status).toBe(401);
  });

  it('/product-variants/:id (GET) - Deve buscar uma variante pelo ID', async () => {
    const variant = await productVariantFactory();

    const response = await request(app.getHttpServer()).get(
      `/product-variants/${variant.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/product-variants/:id (PATCH) - Deve atualizar uma variante com admin', async () => {
    const variant = await productVariantFactory();
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const updatedData = {
      name: 'Nova Variante',
      price: 199.99,
    };

    const response = await request(app.getHttpServer())
      .patch(`/product-variants/${variant.id}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('/product-variants/:id (PATCH) - Deve falhar ao atualizar sem autenticação', async () => {
    const variant = await productVariantFactory();

    const response = await request(app.getHttpServer())
      .patch(`/product-variants/${variant.id}`)
      .send({
        name: 'Variante Atualizada',
      });

    expect(response.status).toBe(401);
  });

  it('/product-variants/:id (DELETE) - Deve deletar uma variante com admin', async () => {
    const variant = await productVariantFactory();
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const response = await request(app.getHttpServer())
      .delete(`/product-variants/${variant.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('/product-variants/:id (DELETE) - Deve falhar ao deletar sem autenticação', async () => {
    const variant = await productVariantFactory();

    const response = await request(app.getHttpServer()).delete(
      `/product-variants/${variant.id}`,
    );

    expect(response.status).toBe(401);
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
