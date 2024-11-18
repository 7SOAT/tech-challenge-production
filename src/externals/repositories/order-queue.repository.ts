import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderQueueDocument } from "../schemas/order.schema";

export class OrderQueueRepository {
  constructor(
    @InjectModel('OrderQueueSchema')
    private readonly orderQueueSchema: Model<OrderQueueDocument>,
  ) {}

  async getAllOrdersInQueue() {
    return await this.orderQueueSchema.find();
  }
}
