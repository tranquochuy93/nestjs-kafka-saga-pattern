export interface ProductServiceInterface {
  checkProductAvailability(request: { [id: string]: number }): boolean;
  reduceStockQuantity(request: { [id: string]: number }): void;
  restockQuantity(request: { [id: string]: number }): void;
}
