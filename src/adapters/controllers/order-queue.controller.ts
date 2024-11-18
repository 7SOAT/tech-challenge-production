import { Injectable } from "@nestjs/common";
import { OrderQueueUseCase } from "src/core/usecases/order-queue.usecase";

@Injectable()
export class OrderQueueController {
  constructor(
    private readonly orderQueueUseCase: OrderQueueUseCase
  ) {}
  
  async getAllOrdersInQueue() {
    return await this.orderQueueUseCase.getAll();
  }
}