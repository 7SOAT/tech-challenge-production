import { OrderQueueController } from "./order-queue.controller";
import { Module } from "@nestjs/common";
import { OrderQueueRepositoryInterface } from "./dtos/order-queue.repository";
import { OrderQueueRepository } from "src/externals/mongoose/repositories/order-queue.repository";
import { RepositoryModule } from "src/externals/mongoose/repositories/repository.module";

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    {
      provide: OrderQueueController,
      useFactory: (orderQueueRepository: OrderQueueRepositoryInterface) => {
        return new OrderQueueController(orderQueueRepository);
      },
      inject: [OrderQueueRepository]
    }
  ],  
  exports: [OrderQueueController],
})
export class ControllersModule {}