import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common';
import { CreateOrderQueueDto } from '../dto/create-order-queue';
import { OrderQueueController } from 'src/adapters/controllers/order-queue.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders-queue')
@Controller('orders-queue')
export class OrderQueueRoute {
  constructor(private readonly orderQueueController: OrderQueueController) {}

  @Get()
  async getAll() {
    try {
      const ordersInQueue = await this.orderQueueController.getAllOrdersInQueue();

      if(!ordersInQueue) return new NotFoundException(`There are no orders in production queue`);

      return ordersInQueue;
    }
    catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
