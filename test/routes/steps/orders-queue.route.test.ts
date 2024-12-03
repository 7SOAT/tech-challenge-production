import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { OrderQueueController } from '../../../src/adapters/controllers/order-queue.controller';
import { OrderQueueRoute } from '../../../src/api/order-queue/order-queue.route';

const feature = loadFeature('./test/routes/features/orders-queue.route.feature');

defineFeature(feature, (test) => {
  let app: INestApplication;
  let mockController: Partial<OrderQueueController>;

  beforeAll(async () => {
    mockController = {
      createOrderQueueItem: jest.fn(),
      getAllOrdersInQueue: jest.fn(),
      syncOrdersInQueue: jest.fn(),
      finishOrder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderQueueRoute],
      providers: [
        {
          provide: OrderQueueController,
          useValue: mockController,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('Create a new order in the queue', ({ given, when, then }) => {
    let response: request.Response;
    let orderId: string;

    given('I have an order with ID "1234"', () => {
      orderId = '9d827eba-8ce4-4198-acac-2082e490e6d4';
      jest.spyOn(mockController, 'createOrderQueueItem').mockResolvedValue({ orderId: "9d827eba-8ce4-4198-acac-2082e490e6d4", positionInQueue: 1 });
    });

    when('I send a POST request to "/orders-queue" with the order ID', async () => {
      response = await request(app.getHttpServer())
        .post('/orders-queue')
        .send({ orderId });
    });

    then('the order should be added to the queue', () => {
      expect(mockController.createOrderQueueItem).toHaveBeenCalledWith(orderId);
    });

    then('the response should contain a success message', () => {
      expect(response.body).toEqual({ 
        orderId: '9d827eba-8ce4-4198-acac-2082e490e6d4', 
        positionInQueue: 1 
      });

      expect(response.status).toBe(201);
    });
  });

  test('List all orders in the queue', ({ given, when, then }) => {
    let response: request.Response;

    given('there are orders in the queue', () => {
      jest.spyOn(mockController, 'getAllOrdersInQueue').mockResolvedValue([
        { orderId: 'b3d126f3-16ef-4d08-9052-0c8a20f4987c', positionInQueue: 1 },
        { orderId: 'ccf05c5c-25a3-48de-a166-5a5f718c1e95', positionInQueue: 2 },
      ]);
    });

    when('I send a GET request to "/orders-queue"', async () => {
      response = await request(app.getHttpServer()).get('/orders-queue');
    });

    then('the response should contain a list of orders', () => {
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('orderId');
      expect(response.body[0]).toHaveProperty('positionInQueue');
    });

    then('each order should have an "orderId" and "positionInQueue"', () => {
      response.body.forEach((order: any) => {
        expect(order).toHaveProperty('orderId');
        expect(order).toHaveProperty('positionInQueue');
      });
    });
  });

  test('No orders in the queue', ({ given, when, then }) => {
    let response: request.Response;

    given('the queue is empty', () => {
      jest.spyOn(mockController, 'getAllOrdersInQueue').mockResolvedValue(null);
    });

    when('I send a GET request to "/orders-queue"', async () => {
      response = await request(app.getHttpServer()).get('/orders-queue');
    });

    then('the response should be a "404 Not Found"', () => {
      expect(response.status).toBe(404);
    });

    then('the message should be "There are no orders in production queue"', () => {
      expect(response.body.message).toBe('There are no orders in production queue');
    });
  });

  test('Synchronize orders in the queue', ({ given, when, then }) => {
    let response: request.Response;

    given('the queue is out of sync', () => {
      jest.spyOn(mockController, 'syncOrdersInQueue').mockResolvedValue([
        { orderId: 'fc9e66ad-9d94-42aa-9eb5-525dfdcc9c7e', positionInQueue: 1 },
        { orderId: '688185fa-000e-40df-979d-54c8e52a3bd3', positionInQueue: 2 },
      ]);
    });

    when('I send a GET request to "/orders-queue/sync"', async () => {
      response = await request(app.getHttpServer()).get('/orders-queue/sync');
    });

    then('the queue should be synchronized', () => {
      expect(mockController.syncOrdersInQueue).toHaveBeenCalled();
    });

    then('the response should contain the updated list of orders', () => {
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('orderId', 'fc9e66ad-9d94-42aa-9eb5-525dfdcc9c7e');
    });
  });

  test('Finish an order in the queue', ({ given, when, then }) => {
    let response: request.Response;
    let orderId: string;

    given('there is an order with ID "a295e42e-dd2b-48f2-bec0-3725597281f3" in the queue', () => {
      orderId = 'a295e42e-dd2b-48f2-bec0-3725597281f3';
      jest.spyOn(mockController, 'finishOrder').mockResolvedValue();
    });

    when('I send a PUT request to "/orders-queue/finish" with the order ID', async () => {
      response = await request(app.getHttpServer())
        .put('/orders-queue/finish')
        .send({ orderId });
    });

    then('the order should be removed from the queue', () => {
      expect(mockController.finishOrder).toHaveBeenCalledWith(orderId);
    });

    then('the response should contain a void message', () => {
      expect(response.body).toEqual({});
      expect(response.status).toBe(200);
    });
  });
});
