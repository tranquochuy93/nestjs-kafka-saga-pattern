import { Order } from 'src/orders/entities/order';
import { Step } from './step';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MessagePatternEnum } from '../enum/message-pattern.enum';

@Injectable()
export class UpdateStockStep extends Step<Order, void> {
  constructor(
    @Inject('INVENTORY')
    private inventoryClient: ClientKafka,
  ) {
    super();
    this.name = 'Update Stock Step';
  }

  async invoke(order: Order): Promise<void> {
    const stockUpdate = await lastValueFrom(
      this.inventoryClient.send(MessagePatternEnum.REDUCE_STOCK_QUANTITY, {
        products: order.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );
    if (!stockUpdate.success) {
      throw new Error("Couldn't update stock");
    }
  }

  async withCompensation(order: Order): Promise<void> {
    const stockUpdate = await lastValueFrom(
      this.inventoryClient.send(MessagePatternEnum.RESTOCK_QUANTITY, {
        products: order.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );
    if (!stockUpdate.success) {
      throw new Error("Couldn't update stock");
    }
  }
}
