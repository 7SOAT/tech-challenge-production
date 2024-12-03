import { UUID } from "crypto";
import { OrderQueueItem } from "src/core/entities/OrderQueueItem";

export interface OrderQueueGatewayInterface {
  create(orderId: UUID): Promise<OrderQueueItem>;
  findAll(): Promise<Array<OrderQueueItem>>;
  delete(orderId: UUID): Promise<any>;
}