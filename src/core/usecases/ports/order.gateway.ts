import { Order } from "src/core/entities/Order";

export interface OrderGatewayInterface {
  getOrdersFromProvider(): Promise<Array<Order>>;
}