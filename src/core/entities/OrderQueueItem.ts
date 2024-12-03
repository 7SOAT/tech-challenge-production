import { UUID } from "crypto";

export class OrderQueueItem {  
  constructor(
    private _orderId: UUID,
    private _positionInQueue: number
  ) {}

  get orderId() { 
    return this._orderId;
  }

  get positionInQueue() {
    return this._positionInQueue;
  }
}