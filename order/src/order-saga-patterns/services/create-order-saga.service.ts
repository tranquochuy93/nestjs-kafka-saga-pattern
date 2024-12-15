import { Injectable } from '@nestjs/common';
import { Order } from 'src/orders/entities/order';
import { Step } from '../steps/step';
import { PlaceOrderStep } from '../steps/place-order.step';
import { CheckProductsAvailabilityStep } from '../steps/check-product-availability.step';
import { AuthorizePaymentStep } from '../steps/authorize-payment.step';
import { ConfirmOrderStep } from '../steps/confirm-order.step';
import { UpdateStockStep } from '../steps/update-stock.step';

@Injectable()
export class CreateOrderSagaService {
  private steps: Step<Order, void>[] = [];
  private successfulSteps: Step<Order, void>[] = [];

  constructor(
    private step1: PlaceOrderStep,
    private step2: CheckProductsAvailabilityStep,
    private step3: AuthorizePaymentStep,
    private step4: ConfirmOrderStep,
    private step5: UpdateStockStep,
  ) {
    this.steps = [step1, step2, step3, step4, step5];
  }

  async execute(order: Order) {
    for (const step of this.steps) {
      try {
        console.info(`Invoking: ${step.name} ...`);
        await step.invoke(order);
        this.successfulSteps.unshift(step);
      } catch (error) {
        console.error(`Failed Step: ${step.name} !!`);
        this.successfulSteps.forEach(async (s) => {
          console.info(`Rollback: ${s.name} ...`);
          await s.withCompensation(order);
        });
        throw error;
      }
    }
    console.info('Order Creation Transaction ended successfully');
  }
}
