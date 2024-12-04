import { UUID } from "crypto";
import { defineFeature, loadFeature } from "jest-cucumber";
import { OrderQueueItem } from "../../../src/core/entities/OrderQueueItem";

const feature = loadFeature('./test/entity/features/order-queue-item.entity.feature');

defineFeature(feature, (test) => {
  test('Create a new order queue item instance', ({ given, when, then, and }) => {
    let firstOrderQueueItem: OrderQueueItem;
    let payload: {
      orderId: UUID;
      positionInQueue: number;
    };

    given('valid parameters', () => {
      payload = {
        orderId: "7f901cd0-8980-4015-ba25-945c8e8d0c2c",
        positionInQueue: 1
      };
    })

    when('creating a new domain order queue item instance', () => {
      firstOrderQueueItem = new OrderQueueItem(
        payload.orderId,
        payload.positionInQueue
      );      
    })

    then('the order queue item instance should be created successfully', () => {
      expect(firstOrderQueueItem).toStrictEqual(
        new OrderQueueItem(
          firstOrderQueueItem.orderId,
          firstOrderQueueItem.positionInQueue
        )
      )
    })

    and('the order queue item should be able to be updated', () => {
      firstOrderQueueItem.orderId = "daedd118-2c8e-4860-8003-76d46c0ed02e";
      firstOrderQueueItem.positionInQueue = 2;

      expect(firstOrderQueueItem).toStrictEqual(
        new OrderQueueItem("daedd118-2c8e-4860-8003-76d46c0ed02e", 2)
      )
    })
  })
})