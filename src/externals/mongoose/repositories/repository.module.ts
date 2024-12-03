import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderQueueSchema } from "../schemas/order.schema";
import { OrderQueueRepository } from "./order-queue.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OrderQueueSchema', schema: OrderQueueSchema },
    ])
  ,],
  providers: [OrderQueueRepository],
  exports: [OrderQueueRepository]
})
export class RepositoryModule {  }