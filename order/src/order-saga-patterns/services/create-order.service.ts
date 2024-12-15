import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../http/dtos/create-order-dto';
import { Order } from 'src/orders/entities/order';
import { OrderItem } from 'src/orders/entities/order-item';
import { CreateOrderSagaService } from 'src/order-saga-patterns/services/create-order-saga.service';

@Injectable()
export class CreateOrderService {
  constructor(private saga: CreateOrderSagaService) {}

  async createOne(body: CreateOrderDto): Promise<void> {
    const order = new Order({
      customerId: body.customerId,
      orderItems: body.orderItems.map((orderItem) => new OrderItem(orderItem)),
    });
    await this.saga.execute(order);
  }
}
