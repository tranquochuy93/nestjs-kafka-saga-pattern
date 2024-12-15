import { Global, Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/memory/product.repository';

@Global()
@Module({
  providers: [
    {
      provide: 'product-repository',
      useClass: ProductRepository,
    },
    ProductService,
  ],
  exports: [ProductService],
  controllers: [],
  imports: [],
})
export class ProductModule {}
