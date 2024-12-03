import { UUID } from "crypto";
import { Order } from "../../entities/order";

export interface OrderGatewayInterface {
  getOrdersFromProvider(): Promise<Array<Order>>;
  setOrderStatusAsFinished(orderId: UUID): Promise<Order>;
}