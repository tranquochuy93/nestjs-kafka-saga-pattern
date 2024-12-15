import {
  Global,
  Inject,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderSagaService } from './services/create-order-saga.service';
import { AuthorizePaymentStep } from './steps/authorize-payment.step';
import { CheckProductsAvailabilityStep } from './steps/check-product-availability.step';
import { ConfirmOrderStep } from './steps/confirm-order.step';
import { PlaceOrderStep } from './steps/place-order.step';
import { UpdateStockStep } from './steps/update-stock.step';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { MessagePatternEnum } from './enum/message-pattern.enum';
import { ConfigService } from '@nestjs/config';
import { OrderModule } from 'src/orders/order.module';
import { CreateOrderService } from './services/create-order.service';
import { CreateOrderController } from './http/controllers/create-order.controller';

@Global()
@Module({
  providers: [
    CreateOrderSagaService,
    AuthorizePaymentStep,
    CheckProductsAvailabilityStep,
    ConfirmOrderStep,
    PlaceOrderStep,
    UpdateStockStep,
    CreateOrderService,
  ],
  exports: [],
  controllers: [CreateOrderController],
  imports: [
    OrderModule,
    ClientsModule.registerAsync([
      {
        name: 'INVENTORY',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: `${configService.get<string>(
                'KAFKA_DEPLOYMENT_STAGE',
                '',
              )}_${configService.get<string>('KAFKA_INVENTORY_CLIENT_ID', '')}`,
              brokers: [configService.get<string>('KAFKA_BROKER', '')],
            },
            consumer: {
              groupId: `${configService.get<string>(
                'KAFKA_DEPLOYMENT_STAGE',
                '',
              )}_${configService.get<string>('KAFKA_INVENTORY_GROUP_ID', '')}`,
            },
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'PAYMENT',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: `${configService.get<string>(
                'KAFKA_DEPLOYMENT_STAGE',
                '',
              )}_${configService.get<string>('KAFKA_PAYMENT_CLIENT_ID', '')}`,
              brokers: [configService.get<string>('KAFKA_BROKER', '')],
            },
            consumer: {
              groupId: `${configService.get<string>(
                'KAFKA_DEPLOYMENT_STAGE',
                '',
              )}_${configService.get<string>('KAFKA_PAYMENT_GROUP_ID', '')}`,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
})
export class OrderSagaPatternModule
  implements OnModuleInit, OnApplicationBootstrap
{
  constructor(
    @Inject('INVENTORY') private readonly inventoryClient: ClientKafka,
    @Inject('PAYMENT') private readonly paymentClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const topics = [...Object.values(MessagePatternEnum)];
    for (const topic of topics) {
      this.inventoryClient.subscribeToResponseOf(topic);
      this.paymentClient.subscribeToResponseOf(topic);
    }
    await this.inventoryClient.connect();
    await this.paymentClient.connect();
  }

  async onApplicationBootstrap() {
    return;
  }
}
