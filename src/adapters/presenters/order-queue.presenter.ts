import { OrderQueueItem } from "../../core/entities/order-queue-item";

export class OrderQueueItemPresenter {
  static toJson(orderQueueItem: OrderQueueItem) {
    return {
      orderId: orderQueueItem.orderId,
      positionInQueue: orderQueueItem.positionInQueue
    }
  }
}