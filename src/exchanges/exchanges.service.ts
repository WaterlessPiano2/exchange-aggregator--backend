import { Exchange, ExchangeDocument } from './schemas/exchange.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExchangesDto } from './dto/exchanges.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
  //  @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  createExchanges(dto: ExchangesDto) {
    const newExchange = new this.exchangeModel({
      name: dto.name,
      description: dto.description,
      webpage: dto.webpage,
      address: dto.address,
      orderBooksURL: dto.orderBooksURL,
      symbolsURL: dto.symbolsURL,
      isReadyForAggregation: dto.isReadyForAggregation,
      // createBy:this.userModel.
    });
    return newExchange.save();
  }
}
