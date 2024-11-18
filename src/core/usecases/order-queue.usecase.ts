import { Injectable } from "@nestjs/common";
import { OrderQueueGateway } from "src/adapters/gateways/order-queue/order-queue.gateway";

@Injectable()
export class OrderQueueUseCase {
  constructor(private readonly orderQueueGateway: OrderQueueGateway) {}
  
  async getAll() {
    return await this.orderQueueGateway.findAll();
  }
}
