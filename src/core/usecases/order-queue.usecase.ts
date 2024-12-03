import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderQueueItem } from "../entities/OrderQueueItem";
import { OrderQueueGatewayInterface } from "./ports/order-queue.gateway";

@Injectable()
export class OrderQueueUseCase {
  constructor(    
    private readonly orderQueueGateway: OrderQueueGatewayInterface,    
  ) {}
  
  async create(orderId: UUID): Promise<OrderQueueItem> {
    try {
      return await this.orderQueueGateway.create(orderId);
    } catch(error) {
      throw new Error(`[OrderQueueUseCase][create]: ${ error }`);
    }
  }

  async getAll(): Promise<Array<OrderQueueItem>> {
    try {
      const orderQueueItems = await this.orderQueueGateway.findAll();
      return orderQueueItems;
    }
    catch(error) {
      throw new Error(`[OrderQueueUseCase][getAll]: ${ error }`);
    }
  }

  // async getOrdersFromMicroservice(): Promise<Array<OrderQueueItem>> {
  //   const ordersFromProvider = await this.orderGateway.getOrdersFromProvider();
  //   return ordersFromProvider;
  // }
}
