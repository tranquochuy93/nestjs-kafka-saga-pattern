import { Global, Module } from '@nestjs/common';
import { OrderRepository } from './repositories/memory/order.repository';
import { OrderService } from './services/order.service';

@Global()
@Module({
  providers: [
    {
      provide: 'order-repository',
      useClass: OrderRepository,
    },
    OrderService,
  ],
  exports: [OrderService],
  controllers: [],
  imports: [],
})
export class OrderModule {}
