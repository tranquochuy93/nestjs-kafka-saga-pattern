import { Global, Module } from '@nestjs/common';
import { ProductMicroservice } from './http/microservices/product.microservice';
import { ProductModule } from 'src/products/product.module';

@Global()
@Module({
  providers: [],
  exports: [],
  controllers: [ProductMicroservice],
  imports: [ProductModule],
})
export class InventoryMicroserviceModule {}
