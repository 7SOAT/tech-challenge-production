import { Injectable } from "@nestjs/common";
import { CreateOrderQueueDto } from "src/api/dto/create-order-queue";
import { OrderQueueUseCase } from "src/core/usecases/order-queue.usecase";

@Injectable()
export class OrderQueueController {
  constructor(
    private readonly orderQueueUseCase: OrderQueueUseCase
  ) {}

  async createOrderQueueItem({ orderId }: CreateOrderQueueDto) {
    return await this.orderQueueUseCase.create(orderId);
  }
  
  async getAllOrdersInQueue() {
    return await this.orderQueueUseCase.getAll();
  }
}