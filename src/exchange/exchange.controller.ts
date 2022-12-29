import { ExchangesService } from './exchanges.service';
import {
  Controller,
  Put,
  Body,
  UseGuards,
  Request,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileName, csvFileFilter, deleteCsvFile } from './utils/csv';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exchangeService: ExchangesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Put()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/csv',
        filename: csvFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const result = await this.exchangeService.createExchanges(req);
    deleteCsvFile();
    return result;
    //TODO: make a propper response
  }

  @Get(':name/metadata')
  async getExchange(@Param('name') name: string) {
    const exchange = await this.exchangeService.getExchange(name);
    return exchange;
  }
}
