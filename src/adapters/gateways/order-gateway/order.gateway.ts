import { OrderQueueItem } from "src/core/entities/OrderQueueItem";
import { OrderGatewayInterface } from "src/core/usecases/ports/order.gateway";
import { OrderMicroserviceProvider } from "src/externals/providers/order-microservice/order-microservice.provider";

export class OrderGateway implements OrderGatewayInterface {
  constructor(
    private orderProvider: OrderMicroserviceProvider
  ) {}
  
  async getOrdersFromProvider(): Promise<Array<OrderQueueItem>> {
    const ordersFromProvider = await this.orderProvider.getAllOrders();

    const formattedOrders = (await ordersFromProvider).map((order) => new OrderQueueItem(order.id, -1));

    return formattedOrders;
  }  
}