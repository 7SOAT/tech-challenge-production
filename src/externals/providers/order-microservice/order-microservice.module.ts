import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { OrderMicroserviceProvider } from "./order-microservice.provider";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [OrderMicroserviceProvider],
  exports: [OrderMicroserviceProvider]
})
export class OrderMicroserviceModule {}