import { UUID } from "crypto";

export class Order {
  constructor(
    private _id: UUID,
    private _status: string,
    private _totalValue: number,
    private _products: Array<string>,
    private _customer: string,
    private _payment: string,
    private _orderNumber: number,
  ) {}

  get id() {
    return this._id;
  }

  get status() {
    return this._status;
  }

  get totalValue() {
    return this._totalValue;
  }

  get products() {
    return this._products;
  }

  get customer() {
    return this._customer;
  }

  get payment() {
    return this._payment;
  }

  get orderNumber() {
    return this._orderNumber;
  }
}