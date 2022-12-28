import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, ObjectId } from 'mongoose';

export type ExchangeDocument = HydratedDocument<Exchange>;

@Schema()
export class Exchange {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  webpage: string;
  @Prop()
  address: string;
  @Prop()
  orderBooksURL: string;
  @Prop()
  symbolsURL: string;
  @Prop({ default: now() })
  createdAt: string;
  @Prop()
  updatedAt: string;
  @Prop()
  createBy: string;
  @Prop()
  lastUpdatedBy: string;
  @Prop({ default: false })
  isReadyForAggregation: boolean;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
