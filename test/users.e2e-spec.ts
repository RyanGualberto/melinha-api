import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
import { userFactory } from './helpers/factories/user-factory';
import { getUserToken } from './helpers/auth.helper';
import { cleanDb } from './helpers/clean-database';
import { prisma } from './config/prisma.client';

describe('Users Controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await cleanDb();
    
    await app.init();
  });

  it('/users (GET) 200', async () => {
    const password = faker.internet.password();
    const user = await userFactory({
      password,
    });
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(200);
  });

  it('/users/:id (GET) 200', async () => {
    const password = faker.internet.password();
    const user = await userFactory({
      password,
    });
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .get('/users/' + user.id)
      .set('Authorization', `Bearer ${token}`);

    expect(200);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
