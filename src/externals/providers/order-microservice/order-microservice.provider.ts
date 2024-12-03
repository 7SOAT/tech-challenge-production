import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { OrderMSResponseDto } from "./dtos/orders-response.dto";
import { lastValueFrom } from "rxjs";
import { Injectable } from "@nestjs/common";

export class OrderMicroserviceProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getAllOrders(): Promise<Array<OrderMSResponseDto>> {
    try {
      const url = `${this.configService.get<string>("ORDER_MS_HOST")}/orders`;
      const response = lastValueFrom(this.httpService.get<Array<OrderMSResponseDto>>(url));

      return (await response).data;
    }
    catch(error) {
      throw error;
    }
  }
}