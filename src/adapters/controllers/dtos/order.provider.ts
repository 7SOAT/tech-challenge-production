import { Order } from "src/core/entities/Order";

export interface OrderProviderInterface {
  getAllOrders(): Promise<Array<Order>>
}