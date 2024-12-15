import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/product.module';
import { InventoryMicroserviceModule } from './inventory-microservice/inventory-microservice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    InventoryMicroserviceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
