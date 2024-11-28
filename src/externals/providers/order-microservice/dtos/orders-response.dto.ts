import { UUID } from "crypto";

export interface OrderMSResponseDto {
  id: UUID;
  status: string;
  totalValue: number;
  products: Array<string>;
  customer: string;
  payment: string;
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
}