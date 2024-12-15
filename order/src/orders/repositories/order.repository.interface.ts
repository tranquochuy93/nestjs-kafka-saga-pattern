import { Order } from 'src/orders/entities/order';

export interface OrderRepositoryInterface {
  save(order: Order): void;
  update(order: Order): void;
}
