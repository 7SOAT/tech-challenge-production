import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { OrderMSResponseDto } from "./dtos/orders-response.dto";
import { lastValueFrom } from "rxjs";
import { Order } from "../../../core/entities/Order";
import { OrderMicroserviceMapper } from "./order-microservice.mapper";
import { OrderProviderInterface } from "../../../../src/adapters/controllers/dtos/order.provider";
import { Inject } from "@nestjs/common";
import { UUID } from "crypto";

export class OrderMicroserviceProvider implements OrderProviderInterface {
  constructor(
    @Inject()
    private readonly httpService: HttpService,
    @Inject()
    private readonly configService: ConfigService
  ) {}  

  async getAllOrders(): Promise<Array<Order>> {
    try {
      const url = `${this.configService.get<string>("ORDER_MS_HOST")}/orders`;
      const response = lastValueFrom(this.httpService.get<Array<OrderMSResponseDto>>(url));

      return (await response).data.map(item => OrderMicroserviceMapper.toDomain(item));
    }
    catch(error) {
      throw new Error(`[OrderMicroserviceProvider][getAllOrders]: ${error} `);
    }
  }

  async updateOrderStatus(orderId: UUID, statusId: number): Promise<Order> {
    try {
      const url = `${this.configService.get<string>("ORDER_MS_HOST")}/orders`;
      const body = {
        id: orderId,
        status: statusId
      };

      const response = lastValueFrom(this.httpService.put<OrderMSResponseDto>(url, body));
      return OrderMicroserviceMapper.toDomain((await response).data);
    } catch(error) {
      throw new Error(`[OrderMicroserviceProvider][updateOrderStatus]: ${error}`);
    }
  }
}