import { Global, Module } from '@nestjs/common';
import { PaymentRepository } from './repositories/memory/payment.repository';
import { PaymentService } from './services/payment.service';

@Global()
@Module({
  providers: [
    {
      provide: 'payment-repository',
      useClass: PaymentRepository,
    },
    PaymentService,
  ],
  exports: [PaymentService],
  controllers: [],
  imports: [],
})
export class PaymentModule {}
