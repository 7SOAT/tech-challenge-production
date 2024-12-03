import { UUID } from "crypto";
import { OrderQueueItem } from "src/core/entities/OrderQueueItem";

export interface OrderQueueRepositoryInterface {
  addOrderInQueue(orderId: UUID): Promise<OrderQueueItem>;
  getAllOrdersInQueue(): Promise<Array<OrderQueueItem>>;
}