
import { UUID } from "crypto";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Order } from "../../../src/core/entities/Order";

const feature = loadFeature('./test/entity/features/order.entity.feature');

defineFeature(feature, (test) => {
  test('Create a new order instance', ({ given, when, then }) => {
    let firstOrder: Order;
    let payload: {
      id: UUID,
      status: string,
      totalValue: number,
      products: Array<string>,
      customer: string,
      payment: string,
      orderNumber: number,
    };

    given('valid parameters', () => {
      payload = {
        id: "7f901cd0-8980-4015-ba25-945c8e8d0c2c",
        customer: "",
        orderNumber: 1,
        payment: "",
        products: ["b03da537-f85b-4488-986d-d07a26f4c285"],
        status: "1",
        totalValue: 50
      };
    })

    when('creating a new domain order instance', () => {
      firstOrder = new Order(
        payload.id,
        payload.status,
        payload.totalValue,
        payload.products,
        payload.customer,
        payload.payment,
        payload.orderNumber
      );      
    })

    then('the order instance should be created successfully', () => {
      expect(firstOrder).toStrictEqual(
        new Order(
          firstOrder.id,
          firstOrder.status,
          firstOrder.totalValue,
          firstOrder.products,
          firstOrder.customer,
          firstOrder.payment,
          firstOrder.orderNumber
        )
      )
    })
  })
})