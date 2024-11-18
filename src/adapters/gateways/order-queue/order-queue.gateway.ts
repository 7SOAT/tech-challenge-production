import { Injectable } from "@nestjs/common";
import { OrderQueueRepository } from "src/externals/repositories/order-queue.repository";

@Injectable()
export class OrderQueueGateway {
  constructor(private _orderQueueRepository: OrderQueueRepository) {}

  async findAll() {
    try {
      const result = await this._orderQueueRepository.getAllOrdersInQueue();
      return result;
    } catch (error) {
      throw new Error(`Error finding all orders queue: ${ error }`);
    }
  }
}
