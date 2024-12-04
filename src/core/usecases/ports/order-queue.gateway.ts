import { UUID } from "crypto";
import { OrderQueueItem } from "../../entities/OrderQueueItem";

export interface OrderQueueGatewayInterface {
  create(orderId: UUID): Promise<OrderQueueItem>;
  findAll(): Promise<Array<OrderQueueItem>>;
  delete(orderId: UUID): Promise<any>;
}