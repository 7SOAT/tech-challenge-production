import { GatewayModule } from "src/adapters/gateways/gateway.module";
import { OrderQueueUseCase } from "./usecases/order-queue.usecase";
import { Module } from "@nestjs/common";

@Module({
  imports: [GatewayModule],
  controllers: [],
  providers: [OrderQueueUseCase],
  exports: [OrderQueueUseCase],
})
export class CoreModule {}