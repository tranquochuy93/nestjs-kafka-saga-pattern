import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Topic } from 'core/decorators/topic.decorator';
import { MessagePatternEnum } from 'src/payment-microservices/enum/message-pattern.enum';
import { AuthorizePaymentMessage } from 'src/payment-microservices/types/authorize-payment.type';
import { PaymentService } from 'src/payments/services/payment.service';

@Controller()
export class PaymentMicroservice {
  constructor(private paymentService: PaymentService) {}

  @Topic({ pattern: MessagePatternEnum.PAYMENT_AUTHORIZE })
  authorizePayment(@Payload() message: AuthorizePaymentMessage) {
    console.info('Payment Service: authorize payment');

    return this.paymentService.authorizePayment(message);
  }

  @Topic({ pattern: MessagePatternEnum.PAYMENT_REFUND })
  refund(@Payload() message: AuthorizePaymentMessage) {
    console.info('Payment Service: refund payment');

    return this.paymentService.refund(message);
  }
}
