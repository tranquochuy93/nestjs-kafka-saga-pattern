import { Injectable } from '@nestjs/common';
import { Step } from './step';
import { Order } from 'src/orders/entities/order';
import { OrderService } from 'src/orders/services/order.service';

@Injectable()
export class ConfirmOrderStep extends Step<Order, void> {
  constructor(private orderService: OrderService) {
    super();
    this.name = 'Confirm Order Step';
  }

  invoke(order: Order): Promise<void> {
    order.confirm();
    this.orderService.update(order);
    return Promise.resolve();
  }

  withCompensation(order: Order): Promise<void> {
    order.cancel();
    this.orderService.update(order);
    return Promise.resolve();
  }
}
