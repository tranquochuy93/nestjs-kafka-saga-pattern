import { Payment } from 'src/payments/entities/payment';

export interface PaymentRepositoryInterface {
  save(payment: Payment): void;
  update(payment: Payment): void;
  findByOrderId(orderId: string): Payment | undefined;
}
