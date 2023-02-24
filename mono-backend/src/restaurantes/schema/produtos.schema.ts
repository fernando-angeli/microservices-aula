import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Restaurante } from './restaurantes.schema';

export type RestauranteDocument = Restaurante & Document;

@Schema({ versionKey: false })
export class Produto {
  _id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante' })
  restauranteId: Restaurante;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: Date, default: Date.now() })
  create: Date;
}
export const ProdutoSchema = SchemaFactory.createForClass(Produto);
