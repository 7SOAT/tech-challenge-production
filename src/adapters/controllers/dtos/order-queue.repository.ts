import { UUID } from "crypto";
import { OrderQueueItem } from "../../../core/entities/OrderQueueItem";

export interface OrderQueueRepositoryInterface {
  addOrderInQueue(orderId: UUID): Promise<OrderQueueItem>;
  getAllOrdersInQueue(): Promise<Array<OrderQueueItem>>;
  removeFromQueue(orderId: UUID): Promise<void>;
}