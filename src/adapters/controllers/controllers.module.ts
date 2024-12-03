import { OrderQueueController } from "./order-queue.controller";
import { Module } from "@nestjs/common";
import { OrderQueueRepositoryInterface } from "./dtos/order-queue.repository";
import { OrderQueueRepository } from "src/externals/mongoose/repositories/order-queue.repository";
import { RepositoryModule } from "src/externals/mongoose/repositories/repository.module";
import { OrderMicroserviceModule } from "src/externals/providers/order-microservice/order-microservice.module";
import { OrderProviderInterface } from "./dtos/order.provider";
import { OrderMicroserviceProvider } from "src/externals/providers/order-microservice/order-microservice.provider";

@Module({
  imports: [RepositoryModule, OrderMicroserviceModule],
  controllers: [],
  providers: [
    {
      provide: OrderQueueController,
      useFactory: (
        orderQueueRepository: OrderQueueRepositoryInterface,
        orderProvider: OrderProviderInterface
      ) => {
        return new OrderQueueController(
          orderQueueRepository, 
          orderProvider
        );
      },
      inject: [
        OrderQueueRepository, 
        OrderMicroserviceProvider
      ]
    }
  ],
  exports: [OrderQueueController],
})
export class ControllersModule {}