import { ExchangesDto } from './dto/exchanges.dto';
import { ExchangesService } from './exchanges.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exchangeService: ExchangesService) {}
  @Post()
  createExchanges(@Body() dto: ExchangesDto) {
    return this.exchangeService.createExchanges(dto);
  }
}
