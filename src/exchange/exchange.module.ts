import { Exchange, ExchangeSchema } from './schemas/exchange.schema';
import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/csv',
    }),
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ExchangeService],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
