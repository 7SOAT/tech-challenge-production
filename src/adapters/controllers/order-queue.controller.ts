import { OrderQueueUseCase } from "src/core/usecases/order-queue.usecase";

export class OrderQueueController {
  constructor(
    private readonly orderQueueUseCase: OrderQueueUseCase
  ) {}
  
  async getAllOrdersInQueue() {
    return await this.orderQueueUseCase.getAll();
  }
}