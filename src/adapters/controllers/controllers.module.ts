import { CoreModule } from "src/core/core.module";
import { OrderQueueController } from "./order-queue.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [OrderQueueController],
  exports: [OrderQueueController],
})
export class ControllersModule {}