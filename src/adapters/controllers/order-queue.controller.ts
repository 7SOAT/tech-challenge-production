import { Injectable } from "@nestjs/common";
import { CreateOrderQueueDto } from "src/api/dto/create-order-queue";
import { OrderQueueUseCase } from "src/core/usecases/order-queue.usecase";
import { OrderQueueGateway } from "../gateways/order-queue/order-queue.gateway";
import { OrderQueueRepositoryInterface } from "./dtos/order-queue.repository";
import { OrderQueueItemPresenter } from "../presenters/order-queue.presenter";

@Injectable()
export class OrderQueueController {
  constructor(private _orderQueueRepository: OrderQueueRepositoryInterface) {}

  async createOrderQueueItem({ orderId }: CreateOrderQueueDto) {
    try {
      const orderQueueGateway = new OrderQueueGateway(this._orderQueueRepository);
      const orderQueueUseCase = new OrderQueueUseCase(orderQueueGateway);    
      return OrderQueueItemPresenter.toJson(await orderQueueUseCase.create(orderId));
    } catch(error) {
      throw new Error(`[OrderQueueController][createOrderQueueItem]: ${error}`);
    }
  }
  
  async getAllOrdersInQueue() {
    try {
      const orderQueueGateway = new OrderQueueGateway(this._orderQueueRepository);
      const orderQueueUseCase = new OrderQueueUseCase(orderQueueGateway);
      return ((await orderQueueUseCase.getAll()).map(item => OrderQueueItemPresenter.toJson(item)));    
    } catch(error) {
      throw new Error(`[OrderQueueController][getAllOrdersInQueue]: ${ error }`);
    }
  }

  // async syncOrders() {
  //   const ordersFromProvider = await this.orderQueueUseCase.getOrdersFromMicroservice();
  //   // const ordersInQueue = await this.orderQueueUseCase.getAll();

  // }
}