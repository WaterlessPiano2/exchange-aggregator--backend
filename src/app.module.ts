import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangesModule } from './exchanges/exchanges.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb://localhost/NestDB'), ExchangesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
