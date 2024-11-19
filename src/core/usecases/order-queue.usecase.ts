import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderQueueGateway } from "src/adapters/gateways/order-queue/order-queue.gateway";
import { OrderQueueItem } from "../entities/OrderQueueItem";

@Injectable()
export class OrderQueueUseCase {
  constructor(private readonly orderQueueGateway: OrderQueueGateway) {}
  
  async create(orderId: UUID): Promise<OrderQueueItem> {
    return await this.orderQueueGateway.create(orderId);
  }

  async getAll(): Promise<Array<OrderQueueItem>> {
    return await this.orderQueueGateway.findAll();
  }
}
