import { UUID } from "crypto";
import { OrderQueueItem } from "../../entities/order-queue-item";

export interface OrderQueueGatewayInterface {
  create(orderId: UUID): Promise<OrderQueueItem>;
  findAll(): Promise<Array<OrderQueueItem>>;
  delete(orderId: UUID): Promise<any>;
}