import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderQueueDocument, OrderQueueItemModel } from "../schemas/order.schema";
import { UUID } from "crypto";
import { OrderQueueRepositoryInterface } from "../../../../src/adapters/controllers/dtos/order-queue.repository";
import { OrderQueueItem } from "../../../core/entities/order-queue-item";
import { OrderQueueItemMapper } from "../mappers/order-queue-item.mapper";

export class OrderQueueRepository implements OrderQueueRepositoryInterface {
  constructor(
    @InjectModel('OrderQueueSchema')
    private readonly orderQueueSchema: Model<OrderQueueDocument>,
  ) {}

  async addOrderInQueue(orderId: UUID): Promise<OrderQueueItem> {
    try {
      const firstOrder = await this.orderQueueSchema.findOne().sort({ positionInQueue: -1 });
      const positionInQueue = firstOrder?.positionInQueue ? firstOrder.positionInQueue + 1 : 1; 
      const result = await this.orderQueueSchema.create({
        orderId,
        positionInQueue
      });
      return OrderQueueItemMapper.toDomain(result);
    }
    catch(error) {
      throw new Error(`[OrderQueueRepository][addOrderInQueue]: ${error}`);
    }
  }

  async getAllOrdersInQueue(): Promise<Array<OrderQueueItem>> {
    try {
      const result = await this.orderQueueSchema.find();
      return result.map(item => OrderQueueItemMapper.toDomain(item));
    }
    catch(error) {
      throw new Error(`[OrderQueueRepository][getAllOrdersInQueue]: ${error}`);
    }    
  }  

  async removeFromQueue(orderId: UUID): Promise<void> {
    try {
      await this.orderQueueSchema.deleteOne({ orderId });
    } catch (error) {
      throw new Error(`[OrderQueueRepository][removeFromQueue]: ${error}`);
    }
  }
}