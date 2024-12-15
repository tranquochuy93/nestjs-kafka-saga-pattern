import { Order } from 'src/orders/entities/order';
import { Step } from './step';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OutOfStockError } from 'src/exceptions/out_of_stock_error';
import { lastValueFrom } from 'rxjs';
import { MessagePatternEnum } from '../enum/message-pattern.enum';

@Injectable()
export class CheckProductsAvailabilityStep extends Step<Order, void> {
  constructor(
    @Inject('INVENTORY')
    private inventoryClient: ClientKafka,
  ) {
    super();
    this.name = 'Check Products Availability Step';
  }

  async invoke(order: Order): Promise<void> {
    const availableProducts = await lastValueFrom(
      this.inventoryClient.send(MessagePatternEnum.CHECK_PRODUCT_AVAILABILITY, {
        products: order.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );

    if (!availableProducts.available) {
      throw new OutOfStockError(
        `${order.orderItems.map((item) => item.productId)} is not available`,
      );
    }
  }

  withCompensation(params: Order): Promise<any> {
    return Promise.resolve();
  }
}
