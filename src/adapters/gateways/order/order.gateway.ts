import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderProviderInterface } from "../../../../src/adapters/controllers/dtos/order.provider";
import { Order } from "../../../core/entities/order";
import { OrderQueueItem } from "../../../core/entities/order-queue-item";
import { OrderGatewayInterface } from "../../../../src/core/usecases/ports/order.gateway";

@Injectable()
export class OrderGateway implements OrderGatewayInterface {
  constructor(
    private _orderProvider: OrderProviderInterface
  ) {}  

  async getOrdersFromProvider(): Promise<Array<Order>> {
    try {
      const ordersFromProvider = await this._orderProvider.getAllOrders();
      return ordersFromProvider;
    }
    catch(error) {
      throw new Error(`[OrderGateway][getOrdersFromProvider]: ${error}`);
    }
  }  

  async setOrderStatusAsFinished(orderId: UUID): Promise<Order> {
    try {
      const finishedOrder = await this._orderProvider.updateOrderStatus(orderId, 3);
      return finishedOrder;
    } catch(error) {
      throw new Error(`[OrderGateway][setOrderStatusAsFinished]: ${error}`);
    }
  }
}