import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
import { userFactory } from './helpers/user-factory';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (Post) 201', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number(),
      })
      .expect(201);
  });

  it('/auth/login (Post) 200', async () => {
    const password = faker.internet.password();
    const user = await userFactory({
      password,
    });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password,
      })
      .expect(200);
  });
});
