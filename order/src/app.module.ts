import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './orders/order.module';
import { OrderSagaPatternModule } from './order-saga-patterns/order-saga-pattern.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OrderModule,
    OrderSagaPatternModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
