import { ExchangesService } from './exchanges.service';
import { Controller, Post } from '@nestjs/common';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exchangeService: ExchangesService) {}
  @Post()
  createExchange() {
    return this.exchangeService.createExchange();
  }
}
