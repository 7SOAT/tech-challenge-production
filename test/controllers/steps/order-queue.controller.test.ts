import { defineFeature, loadFeature } from 'jest-cucumber';
import { OrderQueueController } from '../../../src/adapters/controllers/order-queue.controller';
import { OrderQueueRepositoryInterface } from '../../../src/adapters/controllers/dtos/order-queue.repository';
import { OrderProviderInterface } from '../../../src/adapters/controllers/dtos/order.provider';
import { OrderQueueItemPresenter } from '../../../src/adapters/presenters/order-queue.presenter';
import { UUID } from 'crypto';
import { OrderQueueItem } from '../../../src/core/entities/order-queue-item';
import { Order } from '../../../src/core/entities/order';

const feature = loadFeature('./test/controllers/features/order-queue.controller.feature');

defineFeature(feature, (test) => {
  let controller: OrderQueueController;
  let mockRepository: jest.Mocked<OrderQueueRepositoryInterface>;
  let mockProvider: jest.Mocked<OrderProviderInterface>;

  beforeEach(() => {
    mockRepository = {
      addOrderInQueue: jest.fn(),
      getAllOrdersInQueue: jest.fn(),
      removeFromQueue: jest.fn(),
    };

    mockProvider = {
      getAllOrders: jest.fn(),
      updateOrderStatus: jest.fn(),
    };

    controller = new OrderQueueController(mockRepository, mockProvider);
  });

  test('Create a new order in the queue', ({ given, when, then, and }) => {
    const mockOrderId: UUID = '9de62112-1281-4563-b563-1494509103fb';    

    given('a valid order ID', () => {
      mockRepository.addOrderInQueue.mockResolvedValue(new OrderQueueItem(mockOrderId, 1));
    });

    when('the controller is called to create an order in the queue', async () => {
      const result = await controller.createOrderQueueItem(mockOrderId);
      expect(result).toEqual(OrderQueueItemPresenter.toJson(new OrderQueueItem(mockOrderId, 1)));
    });

    then('the order should be added using the use case', () => {
      expect(mockRepository.addOrderInQueue).toHaveBeenCalledWith(mockOrderId);
    });
  });

  test('Retrieve all orders in the queue', ({ given, when, then }) => {
    const mockOrders = [
      new OrderQueueItem('21fb302f-dc41-4736-9755-6783cdf4cda3', 1),
      new OrderQueueItem('70500a6e-00ff-4031-b9bb-bd74bd4f1579', 2),
    ];

    given('orders exist in the queue', () => {
      mockRepository.getAllOrdersInQueue.mockResolvedValue(mockOrders);
    });

    when('the controller is called to retrieve orders', async () => {
      const result = await controller.getAllOrdersInQueue();
      expect(result).toEqual(mockOrders.map(OrderQueueItemPresenter.toJson));
    });

    then('all orders should be returned in JSON format', () => {
      expect(mockRepository.getAllOrdersInQueue).toHaveBeenCalledTimes(1);
    });
  });

  test('Synchronize orders with the provider', ({ given, when, then, and }) => {
    const mockOrdersFromProvider = [
      new Order(
        '30d7c64d-3d30-4673-9ea4-91022a096ac4', 
        '1', 
        1,
        ["82f485fd-e6f3-4838-9ce5-995f55e3ff04"],
        "",
        "",
        1
      ),
    ];

    const mockOrdersInQueue = [
      new OrderQueueItem('c16c3eaa-bed0-426c-b802-92b9c58fa2c3', 1),
      new OrderQueueItem('65697da1-7c03-4753-b844-ba0159bf15bf', 2),
    ];

    const newOrder: OrderQueueItem = new OrderQueueItem('4611665a-9002-438f-afa2-586b45c26ef4', 3);

    given('orders exist in the provider but not in the queue', () => {
      mockProvider.getAllOrders.mockResolvedValue(mockOrdersFromProvider);
      mockRepository.getAllOrdersInQueue.mockResolvedValue(mockOrdersInQueue);
      mockRepository.addOrderInQueue.mockResolvedValue(newOrder);
    });

    when('the controller is called to synchronize orders', async () => {
      const result = await controller.syncOrdersInQueue();      
      expect(result).toEqual([
        ...mockOrdersInQueue,
      ].map(OrderQueueItemPresenter.toJson));
    });

    then('new orders should be added to the queue', () => {
      expect(mockRepository.addOrderInQueue).toHaveBeenCalledWith('30d7c64d-3d30-4673-9ea4-91022a096ac4');
    });
  });

  test('Finish an order in the queue', ({ given, when, then }) => {
    const orderId: UUID = '8f4037c2-a4e0-49b7-848d-f770a7ac1f16';

    given('a valid order ID', () => {
      mockProvider.updateOrderStatus.mockResolvedValue(new Order(
        'eb887c99-fc4d-4da3-92a0-e343df074cd9', 
        '3', 
        1,
        ["82f485fd-e6f3-4838-9ce5-995f55e3ff04"],
        "",
        "",
        1
      ));
    });

    when('the controller is called to finish the order', async () => {
      await controller.finishOrder(orderId);
    });

    then('the order status should be updated to finished in the provider', () => {
      expect(mockProvider.updateOrderStatus).toHaveBeenCalledWith(orderId, 3);
    });

    then('the order should be removed from the queue', () => {
      expect(mockRepository.removeFromQueue).toHaveBeenCalledWith(orderId);
    });
  });
});