import { defineFeature, loadFeature } from 'jest-cucumber';

import { OrderProviderInterface } from '../../../src/adapters/controllers/dtos/order.provider';
import { OrderGateway } from '../../../src/adapters/gateways/order/order.gateway';
import { UUID } from 'crypto';
import { Order } from '../../../src/core/entities/order';

const feature = loadFeature('./test/gateways/features/order.gateway.feature');

defineFeature(feature, (test) => {
  let gateway: OrderGateway;
  let mockProvider: jest.Mocked<OrderProviderInterface>;

  beforeEach(() => {
    mockProvider = {
      getAllOrders: jest.fn(),
      updateOrderStatus: jest.fn(),
    };
    gateway = new OrderGateway(mockProvider);
  });

  test('Retrieve all orders from the provider', ({ given, when, then }) => {
    let result: Order[];
    const mockOrders: Order[] = [
      new Order(
        '5ae48cd1-d4bc-47ae-a8f0-63bbac41f825', 
        '1', 
        1,
        ["d0f4c27e-f4dc-4876-9287-6560ec9351a3", "29f25c3a-231c-46ab-bd63-33628c16b6c6"],
        "",
        "",
        1
      ),
      new Order(
        '396d1031-3588-488f-8703-b03ef5cb2048', 
        '2', 
        50,
        ["d5636f3d-0140-458b-af90-792496376e42"],
        "12345678909",
        "",
        2
      )
    ];

    given('the provider returns a list of orders', () => {
      mockProvider.getAllOrders.mockResolvedValue(mockOrders);
    });

    when('the gateway retrieves orders from the provider', async () => {
      result = await gateway.getOrdersFromProvider();
    });

    then('the returned orders should match the provider\'s response', () => {
      expect(result).toEqual(mockOrders);
      expect(mockProvider.getAllOrders).toHaveBeenCalledTimes(1);
    });
  });

  test('Set order status as finished', ({ given, when, then }) => {
    let result: Order;
    const orderId: UUID = '5ae48cd1-d4bc-47ae-a8f0-63bbac41f825';
    const finishedOrder: Order = new Order(
      '5ae48cd1-d4bc-47ae-a8f0-63bbac41f825', 
      '1', 
      1,
      ["d0f4c27e-f4dc-4876-9287-6560ec9351a3", "29f25c3a-231c-46ab-bd63-33628c16b6c6"],
      "",
      "",
      1
    );

    given('a valid order ID', () => {
      mockProvider.updateOrderStatus.mockResolvedValue(finishedOrder);
    });

    when('the gateway sets the order status as finished', async () => {
      result = await gateway.setOrderStatusAsFinished(orderId);
    });

    then('the provider should be called to update the order status', () => {
      expect(mockProvider.updateOrderStatus).toHaveBeenCalledWith(orderId, 3);
    });

    then('the returned order should reflect the finished status', () => {
      expect(result).toEqual(finishedOrder);
    });
  });
});