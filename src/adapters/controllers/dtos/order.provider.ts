import { UUID } from "crypto";
import { Order } from "../../../core/entities/Order";

export interface OrderProviderInterface {
  getAllOrders(): Promise<Array<Order>>;
  updateOrderStatus(orderId: UUID, statusId: number): Promise<Order>;
}