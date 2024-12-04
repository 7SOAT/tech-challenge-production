import { UUID } from "crypto";
import { Order } from "../../entities/Order";

export interface OrderGatewayInterface {
  getOrdersFromProvider(): Promise<Array<Order>>;
  setOrderStatusAsFinished(orderId: UUID): Promise<Order>;
}