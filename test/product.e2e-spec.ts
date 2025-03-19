import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { userFactory } from './helpers/factories/user-factory';
import { productFactory } from './helpers/factories/product-factory';
import { cleanDb } from './helpers/clean-database';
import { getUserToken } from './helpers/auth.helper';
import { prisma } from './config/prisma.client';
import { faker } from '@faker-js/faker';
import { categoryFactory } from './helpers/factories/category-factory';

describe('ProductsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await cleanDb();

    await app.init();
  });

  it('/products (GET) - Deve retornar lista vazia inicialmente', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('/products (POST) - Deve criar um produto com usuário admin', async () => {
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const productData = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.float({ min: 10, max: 500 }),
      image: faker.image.url(),
      status: 'active',
      categoryId: (await categoryFactory({})).id,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('/products (POST) - Deve falhar ao criar produto sem autenticação', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 10, max: 500 }),
        image: faker.image.url(),
      });

    expect(response.status).toBe(401);
  });

  it('/products/:id (GET) - Deve buscar um produto pelo ID', async () => {
    const product = await productFactory();

    const response = await request(app.getHttpServer()).get(
      `/products/${product.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/products/:id (PATCH) - Deve atualizar um produto com admin', async () => {
    const product = await productFactory();
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const updatedData = {
      title: 'Novo Nome do Produto',
      price: 299.99,
    };

    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('/products/:id (PATCH) - Deve falhar ao atualizar produto sem autenticação', async () => {
    const product = await productFactory();

    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .send({
        title: 'Produto Atualizado',
      });

    expect(response.status).toBe(401);
  });

  it('/products/:id (DELETE) - Deve deletar um produto com admin', async () => {
    const product = await productFactory();
    const user = await userFactory({ role: 'admin' });
    const token = await getUserToken(user.id);

    const response = await request(app.getHttpServer())
      .delete(`/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('/products/:id (DELETE) - Deve falhar ao deletar sem autenticação', async () => {
    const product = await productFactory();

    const response = await request(app.getHttpServer()).delete(
      `/products/${product.id}`,
    );

    expect(response.status).toBe(401);
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
