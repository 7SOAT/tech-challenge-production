import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderQueueGateway } from "src/adapters/gateways/order-queue/order-queue.gateway";

@Injectable()
export class OrderQueueUseCase {
  constructor(private readonly orderQueueGateway: OrderQueueGateway) {}
  
  async create(orderId: UUID) {
    return await this.orderQueueGateway.create(orderId);
  }

  async getAll() {
    return await this.orderQueueGateway.findAll();
  }
}
