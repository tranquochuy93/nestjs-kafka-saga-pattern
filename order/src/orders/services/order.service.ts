import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/orders/entities/order';
import { OrderRepositoryInterface } from '../repositories/order.repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('order-repository') private orderRepo: OrderRepositoryInterface,
  ) {}

  save(order: Order): void {
    this.orderRepo.save(order);
  }

  update(order: Order): void {
    this.orderRepo.update(order);
  }
}
