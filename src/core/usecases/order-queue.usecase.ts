import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderQueueItem } from "../entities/OrderQueueItem";
import { OrderQueueGatewayInterface } from "./ports/order-queue.gateway";
import { OrderGatewayInterface } from "./ports/order.gateway";

@Injectable()
export class OrderQueueUseCase {
  constructor(
    private readonly orderQueueGateway: OrderQueueGatewayInterface,
    private readonly orderGateway: OrderGatewayInterface
  ) {}
  
  async create(orderId: UUID): Promise<OrderQueueItem> {
    return await this.orderQueueGateway.create(orderId);
  }

  async getAll(): Promise<Array<OrderQueueItem>> {
    return await this.orderQueueGateway.findAll();
  }

  async getOrdersFromMicroservice(): Promise<Array<OrderQueueItem>> {
    const ordersFromProvider = await this.orderGateway.getOrdersFromProvider();
    return ordersFromProvider;
  }
}
