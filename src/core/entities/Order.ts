export class Order {
  constructor(
    private status: string,
    private totalValue: number,
    private products: Array<string>,
    private customer: string,
    private payment: string,
    private orderNumber: number,
  ) {}
}