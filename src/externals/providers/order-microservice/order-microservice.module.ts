import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OrderMicroserviceProvider } from "./order-microservice.provider";

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  providers: [{
    provide: OrderMicroserviceProvider,
    useFactory: (httpService: HttpService, configService: ConfigService) => {
      return new OrderMicroserviceProvider(httpService, configService);
    },
    inject: [HttpService, ConfigService]
  }],
  exports: [OrderMicroserviceProvider]
})
export class OrderMicroserviceModule {}