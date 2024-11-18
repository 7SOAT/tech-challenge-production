import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UUID } from "crypto";
import { HydratedDocument } from "mongoose";

export type OrderQueueDocument = HydratedDocument<OrderQueue>;

@Schema({timestamps: true, collection: "orders_queue"})
export class OrderQueue {
  @Prop({ required: true, unique: true })
  orderId: UUID;

  @Prop({ required: true })
  orderPosition: number;
}

export const OrderQueueSchema = SchemaFactory.createForClass(OrderQueue);