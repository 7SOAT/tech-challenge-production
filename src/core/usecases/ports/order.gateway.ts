import { UUID } from "crypto";
import { Order } from "src/core/entities/Order";

export interface OrderGatewayInterface {
  getOrdersFromProvider(): Promise<Array<Order>>;
  setOrderStatusAsFinished(orderId: UUID): Promise<Order>;
}