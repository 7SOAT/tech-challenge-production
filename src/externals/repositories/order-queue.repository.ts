import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderQueueDocument } from "../schemas/order.schema";
import { UUID } from "crypto";

export class OrderQueueRepository {
  constructor(
    @InjectModel('OrderQueueSchema')
    private readonly orderQueueSchema: Model<OrderQueueDocument>,
  ) {}

  async addOrderInQueue(orderId: UUID) {
    const firstOrder = await this.orderQueueSchema.findOne().sort({ orderPosition: -1 });
    const orderPosition = firstOrder?.orderPosition ? firstOrder.orderPosition + 1 : 0; 
    return await this.orderQueueSchema.create({
      orderId,
      orderPosition
    });
  }

  async getAllOrdersInQueue() {
    return await this.orderQueueSchema.find();
  }  
}