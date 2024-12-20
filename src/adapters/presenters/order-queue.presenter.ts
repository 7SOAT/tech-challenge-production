import { OrderQueueItem } from "../../core/entities/OrderQueueItem";

export class OrderQueueItemPresenter {
  static toJson(orderQueueItem: OrderQueueItem) {
    return {
      orderId: orderQueueItem.orderId,
      positionInQueue: orderQueueItem.positionInQueue
    }
  }
}