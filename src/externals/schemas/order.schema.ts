import { UUID } from "crypto";
import { Document, Schema } from "mongoose";

export interface OrderQueueDocument extends Document {
  orderId: UUID,
  orderPosition: number,
};

export const OrderQueueSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.String,      
    },
    orderPosition: Number,
  }
);