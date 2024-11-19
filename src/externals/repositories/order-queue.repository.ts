import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderQueueDocument, OrderQueueItemModel } from "../schemas/order.schema";
import { UUID } from "crypto";

export class OrderQueueRepository {
  constructor(
    @InjectModel('OrderQueueSchema')
    private readonly orderQueueSchema: Model<OrderQueueDocument>,
  ) {}

  async addOrderInQueue(orderId: UUID): Promise<OrderQueueItemModel> {
    const firstOrder = await this.orderQueueSchema.findOne().sort({ positionInQueue: -1 });
    const positionInQueue = firstOrder?.positionInQueue ? firstOrder.positionInQueue + 1 : 1; 
    return await this.orderQueueSchema.create({
      orderId,
      positionInQueue
    });
  }

  async getAllOrdersInQueue(): Promise<Array<OrderQueueItemModel>> {
    return await this.orderQueueSchema.find();
  }  
}