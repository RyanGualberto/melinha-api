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
    const user = await userFactory({
      role: 'admin',
    });
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(200);
  });

  it('/users (GET) with token of role user', async () => {
    const user = await userFactory({});
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(401);
  });

  it('/users (GET) without token', async () => {
    await request(app.getHttpServer()).get('/users');

    expect(401);
  });

  it('/users/:id (GET) 200', async () => {
    const user = await userFactory({
      role: 'admin',
    });
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .get('/users/' + user.id)
      .set('Authorization', `Bearer ${token}`);

    expect(200);
  });

  it('/users/:id (GET) with token of role user', async () => {
    const user = await userFactory({});
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .get('/users/' + user.id)
      .set('Authorization', `Bearer ${token}`);

    expect(401);
  });

  it('/users/:id (GET) without token', async () => {
    const user = await userFactory({
      role: 'admin',
    });

    await request(app.getHttpServer()).get('/users/' + user.id);

    expect(401);
  });

  it('/users/:id (PATCH) 200', async () => {
    const user = await userFactory({
      role: 'admin',
    });
    const user2 = await userFactory({});
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .patch('/users/' + user2.id)
      .send({
        firstName: faker.person.fullName(),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(200);
  });

  it('/users/:id (PATCH) with token of role user', async () => {
    const user = await userFactory({});
    const user2 = await userFactory({});
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .patch('/users/' + user2.id)
      .send({
        firstName: faker.person.fullName(),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(401);
  });

  it('/users/:id (PATCH) without token', async () => {
    const user2 = await userFactory({});

    await request(app.getHttpServer())
      .patch('/users/' + user2.id)
      .send({
        firstName: faker.person.fullName(),
      });

    expect(401);
  });

  it('/users/:id (DELETE) 204', async () => {
    const user = await userFactory({
      role: 'admin',
    });
    const user2 = await userFactory({});
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .delete('/users/' + user2.id)
      .set('Authorization', `Bearer ${token}`);

    expect(204);
  });

  it('/users/:id (DELETE) with token of role user', async () => {
    const user = await userFactory({});
    const user2 = await userFactory({});
    const token = await getUserToken(user.id);

    await request(app.getHttpServer())
      .delete('/users/' + user2.id)
      .set('Authorization', `Bearer ${token}`);

    expect(401);
  });

  it('/users/:id (DELETE) without token', async () => {
    const user2 = await userFactory({});

    await request(app.getHttpServer()).delete('/users/' + user2.id);

    expect(401);
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
