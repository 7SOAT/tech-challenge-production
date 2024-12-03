import { Injectable } from "@nestjs/common";
import { OrderGatewayInterface } from "./ports/order.gateway";
import { Order } from "../entities/Order";

@Injectable()
export class OrderUseCase {
  constructor(
    private _orderGateway: OrderGatewayInterface
  ) {}

  async getPendingOrders(): Promise<Array<Order>> {
    const result = await this._orderGateway.getOrdersFromProvider();
    return result;
  }
}