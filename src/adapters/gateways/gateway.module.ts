import { OrderQueueRepository } from "src/externals/repositories/order-queue.repository";
import { RepositoryModule } from "src/externals/repositories/repository.module";
import { OrderQueueGateway } from "./order-queue/order-queue.gateway";
import { Module } from "@nestjs/common";
import { OrderQueueSchema } from "src/externals/schemas/order.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    RepositoryModule.register({
      imports: [
        MongooseModule.forFeature([
          { name: 'OrderQueueSchema', schema: OrderQueueSchema },
        ]),
      ],
      providers: [OrderQueueRepository],
      controllers: [],
      exports: [OrderQueueRepository],
    }),
  ],
  controllers: [],
  providers: [OrderQueueGateway],
  exports: [OrderQueueGateway],
})
export class GatewayModule {}