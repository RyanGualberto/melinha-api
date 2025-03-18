import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
import { userFactory } from './helpers/user-factory';
import { getUserToken } from './helpers/auth.helper';
import { resetDatabaseTest } from './config/setup-database';

describe('Users Controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(() => {
    resetDatabaseTest();
    console.log('reset database');
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
});
