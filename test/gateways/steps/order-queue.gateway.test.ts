import { defineFeature, loadFeature } from 'jest-cucumber';
import { OrderQueueRepositoryInterface } from '../../../src/adapters/controllers/dtos/order-queue.repository';
import { OrderQueueItem } from '../../../src/core/entities/OrderQueueItem';
import { OrderQueueGateway } from '../../../src/adapters/gateways/order-queue/order-queue.gateway';
import { UUID } from 'crypto';

const feature = loadFeature('./test/gateways/features/order-queue.gateway.feature');

defineFeature(feature, (test) => {
  let gateway: OrderQueueGateway;
  let mockRepository: jest.Mocked<OrderQueueRepositoryInterface>;

  beforeEach(() => {
    mockRepository = {
      addOrderInQueue: jest.fn(),
      getAllOrdersInQueue: jest.fn(),
      removeFromQueue: jest.fn(),
    } as jest.Mocked<OrderQueueRepositoryInterface>;

    gateway = new OrderQueueGateway(mockRepository);
  });

  test('Create a new order in the queue', ({ given, when, then, and }) => {
    let orderId: UUID;
    let result: OrderQueueItem;

    given('a valid order ID "935aa5da-6fde-40ea-9143-450704a2806d"', () => {
      orderId = '935aa5da-6fde-40ea-9143-450704a2806d';
      mockRepository.addOrderInQueue.mockResolvedValue(new OrderQueueItem(orderId, 1));
    });

    when('the gateway is used to create the order in the queue', async () => {
      result = await gateway.create(orderId);
    });

    then('the order should be added successfully', () => {
      expect(mockRepository.addOrderInQueue).toHaveBeenCalledWith(orderId);
    });

    and('it should return the order with the correct ID and position in the queue', () => {
      expect(result).toEqual(new OrderQueueItem('935aa5da-6fde-40ea-9143-450704a2806d', 1));
    });
  });

  test('Retrieve all orders in the queue', ({ given, when, then }) => {
    let result: Array<OrderQueueItem>;

    given('there are multiple orders in the queue', () => {
      mockRepository.getAllOrdersInQueue.mockResolvedValue([
        new OrderQueueItem('59428e48-38b7-4b2e-9c79-4f46e7ef62eb', 1),
        new OrderQueueItem('03dd3ca7-684c-461a-a991-9847dbdd3f97', 2),
      ]);
    });

    when('the gateway is used to retrieve all orders', async () => {
      result = await gateway.findAll();
    });

    then('it should return a list of all orders in the queue', () => {
      expect(mockRepository.getAllOrdersInQueue).toHaveBeenCalled();
      expect(result).toEqual([
        new OrderQueueItem('59428e48-38b7-4b2e-9c79-4f46e7ef62eb', 1),
        new OrderQueueItem('03dd3ca7-684c-461a-a991-9847dbdd3f97', 2),
      ]);
    });
  });

  test('Delete an order from the queue', ({ given, when, then }) => {
    let orderId: UUID;

    given('an order with ID "9291e14a-ffa0-4c03-8eea-a879b3bad4fd" exists in the queue', () => {
      orderId = '9291e14a-ffa0-4c03-8eea-a879b3bad4fd';
      mockRepository.removeFromQueue.mockResolvedValue(undefined);
    });

    when('the gateway is used to delete the order from the queue', async () => {
      await gateway.delete(orderId);
    });

    then('the order should be removed successfully', () => {
      expect(mockRepository.removeFromQueue).toHaveBeenCalledWith(orderId);
    });
  });
});