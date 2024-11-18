import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderQueueDto {
  @ApiProperty({
    type: 'string',
    description: 'Created order id',
  })
  @IsNotEmpty()
  orderId: UUID;
}
