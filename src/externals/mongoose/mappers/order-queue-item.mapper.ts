import { OrderQueueItem } from "../../../core/entities/order-queue-item";
import { OrderQueueItemModel } from '../schemas/order.schema';

export class OrderQueueItemMapper {
  static toDomain(orderQueueItemModel: OrderQueueItemModel) {
    return new OrderQueueItem(
      orderQueueItemModel.orderId,
      orderQueueItemModel.positionInQueue
    );
  }
}