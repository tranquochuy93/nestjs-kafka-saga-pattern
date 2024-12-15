import { Injectable } from '@nestjs/common';
import { Step } from './step';
import { Order } from 'src/orders/entities/order';
import { OrderService } from 'src/orders/services/order.service';

@Injectable()
export class PlaceOrderStep extends Step<Order, void> {
  constructor(private orderService: OrderService) {
    super();
    this.name = 'Place Order Step';
  }

  invoke(order: Order): Promise<void> {
    this.orderService.save(order);
    return Promise.resolve();
  }

  withCompensation(order: Order): Promise<void> {
    order.cancel();
    this.orderService.update(order);
    return Promise.resolve();
  }
}
