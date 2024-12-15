import { Inject } from '@nestjs/common';
import { ProductServiceInterface } from './product.service.interface';
import { ProductRepositoryInterface } from 'src/products/repositories/product.repository.interface';

export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject('product-repository')
    private productRepository: ProductRepositoryInterface,
  ) {}

  checkProductAvailability(request: { [id: string]: number }): boolean {
    console.log(request);
    const products = this.productRepository.findMany(Object.keys(request));
    console.log(products);
    return products.every((product) =>
      product.isStockSufficient(request[product.id]),
    );
  }

  reduceStockQuantity(request: { [id: string]: number }): void {
    const products = this.productRepository.findMany(Object.keys(request));
    products.forEach(
      (product, index, arr) => (arr[index].quantity -= request[product.id]),
    );
    this.productRepository.updateMany(products);
  }

  restockQuantity(request: { [id: string]: number }): void {
    const products = this.productRepository.findMany(Object.keys(request));
    products.forEach(
      (product, index, arr) => (arr[index].quantity += request[product.id]),
    );

    this.productRepository.updateMany(products);
  }
}
