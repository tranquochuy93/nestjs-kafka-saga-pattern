import { Inject, Injectable } from '@nestjs/common';
import { Step } from './step';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentNotSuccessfulError } from 'src/exceptions/payment_not_successful';
import { lastValueFrom } from 'rxjs';
import { Order } from 'src/orders/entities/order';
import { MessagePatternEnum } from '../enum/message-pattern.enum';

@Injectable()
export class AuthorizePaymentStep extends Step<Order, void> {
  constructor(@Inject('PAYMENT') private paymentClient: ClientKafka) {
    super();
    this.name = 'Authorize Payment Step';
  }

  async invoke(order: Order): Promise<any> {
    const paymentAuthorization = await lastValueFrom(
      this.paymentClient.send(MessagePatternEnum.PAYMENT_AUTHORIZE, {
        orderId: order.id,
        amount: order.orderItems.reduce((accumulator: number, item) => {
          return accumulator + item.totalPrice;
        }, 0),
      }),
    );

    if (!paymentAuthorization.authorized) {
      throw new PaymentNotSuccessfulError('The payment unsuccessful');
    }
  }

  async withCompensation(order: Order): Promise<any> {
    await lastValueFrom(
      this.paymentClient.send(MessagePatternEnum.PAYMENT_REFUND, {
        orderId: order.id,
        amount: order.orderItems.reduce((accumulator: number, item) => {
          return accumulator + item.totalPrice;
        }, 0),
      }),
    );
  }
}
