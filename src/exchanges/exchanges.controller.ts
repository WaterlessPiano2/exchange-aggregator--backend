import { ExchangesDto } from './dto/exchanges.dto';
import { ExchangesService } from './exchanges.service';
import { Controller, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exchangeService: ExchangesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Put()
  createExchanges(@Body() dto: ExchangesDto[], @Request() req) {
    return this.exchangeService.createExchanges(dto, req);
  }
}
