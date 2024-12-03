import { UUID } from "crypto";
import { OrderQueueItem } from "../../../core/entities/order-queue-item";

export interface OrderQueueRepositoryInterface {
  addOrderInQueue(orderId: UUID): Promise<OrderQueueItem>;
  getAllOrdersInQueue(): Promise<Array<OrderQueueItem>>;
  removeFromQueue(orderId: UUID): Promise<void>;
}