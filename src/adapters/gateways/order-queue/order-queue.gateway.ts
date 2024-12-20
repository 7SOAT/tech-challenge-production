import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { OrderQueueRepositoryInterface } from "../../../../src/adapters/controllers/dtos/order-queue.repository";
import { OrderQueueItem } from "../../../core/entities/OrderQueueItem";
import { OrderQueueGatewayInterface } from "../../../../src/core/usecases/ports/order-queue.gateway";

@Injectable()
export class OrderQueueGateway implements OrderQueueGatewayInterface {
  constructor(private _orderQueueRepository: OrderQueueRepositoryInterface) {}

  async create(orderId: UUID): Promise<OrderQueueItem> {
    try {
      const result = await this._orderQueueRepository.addOrderInQueue(orderId);
      return result;
    } catch(error) {
      throw new Error(`[OrderQueueGateway][create]: ${ error }`);
    }
  }

  async findAll(): Promise<Array<OrderQueueItem>> {
    try {
      const ordersInQueue = await this._orderQueueRepository.getAllOrdersInQueue()      
      return ordersInQueue;
    } catch (error) {
      throw new Error(`[OrderQueueGateway][findAll]: ${ error }`);
    }
  }

  async delete(orderId: UUID): Promise<any> {
    try {
      await this._orderQueueRepository.removeFromQueue(orderId);
    } catch(error) {
      throw new Error(`[OrderQueueGateway][delete]: ${ error }`);
    }
  }
}