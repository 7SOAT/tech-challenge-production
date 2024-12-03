import { Injectable } from "@nestjs/common";
import { CreateOrderQueueDto } from "src/api/dto/create-order-queue";
import { OrderQueueUseCase } from "src/core/usecases/order-queue.usecase";
import { OrderQueueGateway } from "../gateways/order-queue/order-queue.gateway";
import { OrderQueueRepositoryInterface } from "./dtos/order-queue.repository";
import { OrderQueueItemPresenter } from "../presenters/order-queue.presenter";
import { OrderProviderInterface } from "./dtos/order.provider";
import { OrderGateway } from "../gateways/order/order.gateway";
import { OrderUseCase } from "src/core/usecases/order.usecase";

@Injectable()
export class OrderQueueController {
  constructor(
    private _orderQueueRepository: OrderQueueRepositoryInterface,
    private _orderProvider: OrderProviderInterface
  ) {}

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

  async syncOrdersInQueue() {
    try {
      const orderGateway = new OrderGateway(this._orderProvider);
      const orderUseCase = new OrderUseCase(orderGateway);
      const ordersFromProvider = await orderUseCase.getPendingOrders();

      const orderQueueGateway = new OrderQueueGateway(this._orderQueueRepository);
      const orderQueueUseCase = new OrderQueueUseCase(orderQueueGateway);
      const ordersInQueue = await orderQueueUseCase.getAll();

      const ordersToAddInQueue = ordersFromProvider.filter(
        (orderFromProvider) => !ordersInQueue.some((orderInQueue) => orderInQueue.orderId === orderFromProvider.id)
      );
      
      for(let order of ordersToAddInQueue)
        ordersInQueue.push(await orderQueueUseCase.create(order.id));
     
      return ordersInQueue.sort((a, b) => a.positionInQueue - b.positionInQueue).map(item => OrderQueueItemPresenter.toJson(item));
    }
    catch(error) {
      throw new Error(`[OrderQueueController][syncOrdersInQueue]: ${error}`);
    }
  }
}