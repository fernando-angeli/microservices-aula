import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

class Address {
  @Prop({ type: String })
  street: string;

  @Prop({ type: String })
  district: string;

  @Prop({ type: String })
  zipCode: string;

  @Prop({ type: String })
  complement: string;
}

export type RestauranteDocument = Restaurante & Document;

@Schema({ versionKey: false })
export class Restaurante {
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Address })
  address: Address;
}

export const RestauranteSchema = SchemaFactory.createForClass(Restaurante);
