import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Put } from '@nestjs/common';
import { CreateOrderQueueDto } from '../dtos/create-order-queue';
import { OrderQueueController } from '../../../src/adapters/controllers/order-queue.controller';
import { ApiTags } from '@nestjs/swagger';
import { FinishOrderDto } from '../dtos/finish-order';

@ApiTags('orders-queue')
@Controller('orders-queue')
export class OrderQueueRoute {
  constructor(private readonly orderQueueController: OrderQueueController) {}

  @Post()
  async create(@Body() dto: CreateOrderQueueDto) {
    return await this.orderQueueController.createOrderQueueItem(dto.orderId);
  }
  
  @Get()
  async getAll() {
    try {      
      const ordersInQueue = await this.orderQueueController.getAllOrdersInQueue();

      if(!ordersInQueue?.length) throw new NotFoundException(`There are no orders in production queue`);

      return ordersInQueue;
    }
    catch(error) {
      throw error;
    }
  }
  
  @Get("/sync")
  async sync() {
    try {
      const ordersInQueue = await this.orderQueueController.syncOrdersInQueue();
      return ordersInQueue;
    }
    catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put("/finish")
  async finishOrder(@Body() dto: FinishOrderDto) {
    try {
      const finishedOrder = await this.orderQueueController.finishOrder(dto.orderId);
      return finishedOrder;
    }
    catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
