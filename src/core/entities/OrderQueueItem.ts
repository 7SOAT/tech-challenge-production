import { UUID } from "crypto";

export class OrderQueueItem {  
  constructor(
    orderId: UUID,
    positionInQueue: number
  ) {}
}