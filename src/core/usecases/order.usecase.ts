import { Injectable } from "@nestjs/common";
import { OrderGatewayInterface } from "./ports/order.gateway";
import { Order } from "../entities/Order";
import { UUID } from "crypto";

@Injectable()
export class OrderUseCase {
  constructor(
    private _orderGateway: OrderGatewayInterface
  ) {}

  async getPendingOrders(): Promise<Array<Order>> {
    const result = await this._orderGateway.getOrdersFromProvider();
    return result;
  }

  async setOrderStatusAsFinished(orderId: UUID): Promise<Order> {
    const result = await this._orderGateway.setOrderStatusAsFinished(orderId);
    return result;
  }
}