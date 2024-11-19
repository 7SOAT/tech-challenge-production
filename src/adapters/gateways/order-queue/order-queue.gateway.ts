import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderQueueItem } from "src/core/entities/OrderQueueItem";
import { OrderQueueGatewayInterface } from "src/core/usecases/ports/order-queue.gateway";
import { OrderQueueItemMapper } from "src/externals/mappers/order-queue-item.mapper";
import { OrderQueueRepository } from "src/externals/repositories/order-queue.repository";

@Injectable()
export class OrderQueueGateway implements OrderQueueGatewayInterface {
  constructor(private _orderQueueRepository: OrderQueueRepository) {}

  async create(orderId: UUID): Promise<OrderQueueItem> {
    const result = await this._orderQueueRepository.addOrderInQueue(orderId);
    return OrderQueueItemMapper.toDomain(result);
  }

  async findAll(): Promise<Array<OrderQueueItem>> {
    try {
      const result = (await this._orderQueueRepository.getAllOrdersInQueue())
        .map(item => OrderQueueItemMapper.toDomain(item));

      return result;
    } catch (error) {
      throw new Error(`Error finding all orders queue: ${ error }`);
    }
  }
}