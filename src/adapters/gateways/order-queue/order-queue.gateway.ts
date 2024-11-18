import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderQueueRepository } from "src/externals/repositories/order-queue.repository";

@Injectable()
export class OrderQueueGateway {
  constructor(private _orderQueueRepository: OrderQueueRepository) {}

  async create(orderId: UUID) {
    return this._orderQueueRepository.addOrderInQueue(orderId);
  }

  async findAll() {
    try {
      const result = await this._orderQueueRepository.getAllOrdersInQueue();
      return result;
    } catch (error) {
      throw new Error(`Error finding all orders queue: ${ error }`);
    }
  }
}
