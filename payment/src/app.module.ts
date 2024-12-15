import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payments/payment.module';
import { PaymentMicroserviceModule } from './payment-microservices/payment-microservice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PaymentModule,
    PaymentMicroserviceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
