import { Exchange, ExchangeDocument } from './schemas/exchange.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { parseCSV } from './utils/csv';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createExchanges(req) {
    //TODO: Error handling
    const user = await this.userModel.findOne({ email: req?.user?.email });

    const mappedExchanges = parseCSV().map((exchange) => {
      return {
        id: exchange.id,
        name: exchange.name,
        description: exchange.description,
        webpage: exchange.webpage,
        address: exchange.address,
        orderBooksURL: exchange.orderBooksURL,
        symbolsURL: exchange.symbolsURL,
        isReadyForAggregation: exchange.isReadyForAggregation,
        createBy: user._id,
      };
    });

    const bulkUpdateOps = mappedExchanges.map(function (doc) {
      return {
        updateOne: {
          filter: { id: doc.id },
          update: { $set: doc },
          upsert: true,
        },
      };
    });

    //TODO: Error handling
    return this.exchangeModel.bulkWrite(bulkUpdateOps);
  }
}
