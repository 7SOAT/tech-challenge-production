import { UUID } from "crypto";

export class OrderQueueItem {  
  constructor(
    private orderId: UUID,
    private positionInQueue: number
  ) {}
}