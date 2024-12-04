import { Order } from "../../../core/entities/Order";
import { OrderMSResponseDto } from "./dtos/orders-response.dto";

export class OrderMicroserviceMapper {
  static toDomain(orderResponse: OrderMSResponseDto) {
    return new Order(
      orderResponse._id,
      orderResponse.status,
      orderResponse.totalValue,
      orderResponse.products,
      orderResponse.customer,
      orderResponse.payment,
      orderResponse.orderNumber
    );
  }
}