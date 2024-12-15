import { Global, Module } from '@nestjs/common';
import { PaymentMicroservice } from './http/microservices/payment.microservice';
import { PaymentModule } from 'src/payments/payment.module';

@Global()
@Module({
  providers: [],
  exports: [],
  controllers: [PaymentMicroservice],
  imports: [PaymentModule],
})
export class PaymentMicroserviceModule {}
