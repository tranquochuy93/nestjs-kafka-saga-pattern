import {
  Body,
  Controller,
  GoneException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order-dto';
import { OutOfStockError } from 'src/exceptions/out_of_stock_error';
import { PaymentNotSuccessfulError } from 'src/exceptions/payment_not_successful';
import { PaymentRequiredException } from 'src/exceptions/http/payment_required_exception';
import { CreateOrderService } from 'src/order-saga-patterns/services/create-order.service';

@Controller('orders')
export class CreateOrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    try {
      await this.createOrderService.createOne(body);
    } catch (error) {
      if (error instanceof OutOfStockError) {
        throw new GoneException({ message: error.message });
      }

      if (error instanceof PaymentNotSuccessfulError) {
        throw new PaymentRequiredException({ message: error.message });
      }

      throw new InternalServerErrorException({ message: error });
    }
  }
}
