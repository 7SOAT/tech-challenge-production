import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UUID } from "crypto";
import { HydratedDocument } from "mongoose";

export type OrderQueueDocument = HydratedDocument<OrderQueueItemModel>;

@Schema({timestamps: true, collection: "orders_queue"})
export class OrderQueueItemModel {
  @Prop({ required: true, unique: true })
  orderId: UUID;

  @Prop({ required: true, unique: true })
  positionInQueue: number;
}

export const OrderQueueSchema = SchemaFactory.createForClass(OrderQueueItemModel);