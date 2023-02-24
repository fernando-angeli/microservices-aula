import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutosService } from './produtos.service';
import { RestaurantesController } from './restaurantes.controller';
import { RestaurantesService } from './restaurantes.service';
import { Produto, ProdutoSchema } from './schema/produtos.schema';
import { Restaurante, RestauranteSchema } from './schema/restaurantes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: RestauranteSchema, name: Restaurante.name },
      { schema: ProdutoSchema, name: Produto.name },
    ]),
  ],
  providers: [RestaurantesService, ProdutosService],
  controllers: [RestaurantesController],
})
export class RestaurantesModule {}
