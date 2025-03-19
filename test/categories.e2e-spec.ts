import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';
import { userFactory } from './helpers/user-factory';
import { getUserToken } from './helpers/auth.helper';
import { categoryFactory } from './helpers/category-factory';
import { cleanDb } from './helpers/clean-database';
import { prisma } from './helpers/prisma.client';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await cleanDb();

    await app.init();
  });

  it('/categories (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('/categories (POST)', async () => {
    const user = await userFactory({});
    const token = await getUserToken(user.id);

    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Category 1' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('/categories (POST) without token', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Category 1' });

    expect(response.status).toBe(401);
  });

  it('/categories/:id (GET)', async () => {
    const category = await categoryFactory({ name: 'Category 1' });

    const response = await request(app.getHttpServer()).get(
      `/categories/${category.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/categories/:id (PATCH)', async () => {
    const category = await categoryFactory({ name: 'Category 1' });
    const password = faker.internet.password();
    const user = await userFactory({
      password,
    });
    const token = await getUserToken(user.id);

    const response = await request(app.getHttpServer())
      .patch(`/categories/${category.id}`)
      .send({ name: 'Category 2' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('/categories/:id (PATCH) without token', async () => {
    const category = await categoryFactory({ name: 'Category 1' });

    const response = await request(app.getHttpServer())
      .patch(`/categories/${category.id}`)
      .send({ name: 'Category 2' });

    expect(response.status).toBe(401);
  });

  it('/categories/:id (DELETE)', async () => {
    const category = await categoryFactory({ name: 'Category 1' });
    const password = faker.internet.password();
    const user = await userFactory({
      password,
    });
    const token = await getUserToken(user.id);

    const response = await request(app.getHttpServer())
      .delete(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('/categories/:id (DELETE) without token', async () => {
    const category = await categoryFactory({ name: 'Category 1' });

    const response = await request(app.getHttpServer()).delete(
      `/categories/${category.id}`,
    );

    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
