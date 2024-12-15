import { Product } from 'src/products/entities/product';

export interface ProductRepositoryInterface {
  update(product: Product): void;
  findMany(ids: string[]): Product[];
  updateMany(products: Partial<Product>[]): void;
}
