import { UUID } from "crypto";

export interface OrderMSResponseDto {
  _id: UUID;
  status: string;
  totalValue: number;
  products: Array<string>;
  customer: string;
  payment: string;
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
}