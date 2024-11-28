import { OrderQueueItem } from "src/core/entities/OrderQueueItem";

export interface OrderGatewayInterface {
  getOrdersFromProvider(): Promise<Array<OrderQueueItem>>;
}