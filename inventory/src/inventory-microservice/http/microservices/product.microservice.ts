import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Topic } from 'src/core/decorators/topic.decorator';
import { MessagePatternEnum } from 'src/inventory-microservice/enum/message-pattern.enum';
import { CheckProductsAvailabilityMessage } from 'src/inventory-microservice/types/check-product-availability.type';
import { UpdateStockMessage } from 'src/inventory-microservice/types/update-stock.type';
import { ProductService } from 'src/products/services/product.service';

@Controller()
export class ProductMicroservice {
  constructor(private productService: ProductService) {}

  @Topic({ pattern: MessagePatternEnum.HELLO_WORLD })
  helloWorld(): string {
    return 'hello world';
  }

  @Topic({ pattern: MessagePatternEnum.CHECK_PRODUCT_AVAILABILITY })
  checkProductAvailability(
    @Payload() message: CheckProductsAvailabilityMessage,
  ) {
    return {
      available: this.productService.checkProductAvailability(
        message.products.reduce(
          (result, { id, quantity }) => ({ ...result, [id]: quantity }),
          {},
        ),
      ),
    };
  }

  @Topic({ pattern: MessagePatternEnum.REDUCE_STOCK_QUANTITY })
  reduceStockQuantity(@Payload() message: UpdateStockMessage) {
    console.info('Inventory Service: reduce stock quantity');

    this.productService.reduceStockQuantity(
      message.products.reduce(
        (result, { id, quantity }) => ({ ...result, [id]: quantity }),
        {},
      ),
    );
    return {
      success: true,
    };
  }

  @Topic({ pattern: MessagePatternEnum.RESTOCK_QUANTITY })
  restockQuantity(@Payload() message: UpdateStockMessage) {
    console.info('Inventory Service: restock quantity');

    this.productService.restockQuantity(
      message.products.reduce(
        (result, { id, quantity }) => ({ ...result, [id]: quantity }),
        {},
      ),
    );

    return {
      success: true,
    };
  }
}
