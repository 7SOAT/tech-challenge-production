import { OrderQueueItem } from "src/core/entities/OrderQueueItem";
import { OrderQueueItemModel } from '../schemas/order.schema';

export class OrderQueueItemMapper {
  static toDomain(orderQueueItemModel: OrderQueueItemModel) {
    return new OrderQueueItem(
      orderQueueItemModel.orderId,
      orderQueueItemModel.positionInQueue
    );
  }
}