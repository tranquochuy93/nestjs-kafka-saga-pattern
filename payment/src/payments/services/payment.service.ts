import { Inject } from '@nestjs/common';
import { PaymentRepositoryInterface } from 'src/payments/repositories/payment.repository.interface';
import { Payment } from 'src/payments/entities/payment';

export class PaymentService {
  constructor(
    @Inject('payment-repository')
    private paymentRepository: PaymentRepositoryInterface,
  ) {}
  authorizePayment(request: { orderId: string; amount: number }): {
    authorized: boolean;
  } {
    // call third party payment provider

    const payment = new Payment({ ...request });
    payment.authorize();
    this.paymentRepository.save(payment);
    return { authorized: true };
  }

  refund(request: { orderId: string; amount: number }): void {
    // call third party payment provider

    const payment = this.paymentRepository.findByOrderId(request.orderId);
    if (!payment) return;
    payment.cancel();
    this.paymentRepository.update(payment);
  }
}
