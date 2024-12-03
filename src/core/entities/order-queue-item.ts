import { UUID } from "crypto";

export class OrderQueueItem {  
  constructor(
    private _orderId: UUID,
    private _positionInQueue: number
  ) {}

  get orderId() { 
    return this._orderId;
  }
  set orderId(orderId: UUID) {
    this._orderId = orderId;
  }

  get positionInQueue() {
    return this._positionInQueue;
  }
  set positionInQueue(positionInQueue: number) {
    this._positionInQueue = positionInQueue;
  }
}