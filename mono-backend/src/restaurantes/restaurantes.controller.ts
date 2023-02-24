import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestaurantesService } from './restaurantes.service';
import { Restaurante } from './schema/restaurantes.schema';
import { CriarRestauranteDto } from './dto/criar-restaurantes.dto';
import { CriarRestaurenteProdutoDto } from './dto/criar-produtos.dto';
import { ProdutosService } from './produtos.service';
import { Produto } from './schema/produtos.schema';

@Controller('restaurantes')
export class RestaurantesController {
  constructor(
    private readonly restauranteService: RestaurantesService,
    private readonly produtoService: ProdutosService,
  ) {}

  @Post()
  async criarRestaurantes(
    @Body() restauranteDto: CriarRestauranteDto,
  ): Promise<Restaurante> {
    return this.restauranteService.criarRestaurente(restauranteDto);
  }

  @Get()
  async buscarRestaurentes() {
    return this.restauranteService.buscarRestaurantes();
  }

  @Get(':id')
  async buscarRestaurantesPorId(@Param('id') restauranteId: string) {
    return this.restauranteService.buscarRestaurantesPorId(restauranteId);
  }

  @Put(':id')
  async atualizarRestaurantePorId(
    @Param('id') restauranteId: string,
    @Body() restauranteDto: CriarRestauranteDto,
  ) {
    return this.restauranteService.atualizarRestaurentePorId(
      restauranteId,
      restauranteDto,
    );
  }

  @Delete(':id')
  async deletarRestaurantesPorId(@Param('id') restauranteId: string) {
    return this.restauranteService.deletarRestaurante(restauranteId);
  }

  @Post(':id/produtos')
  async criarProduto(
    @Body() produtoDto: CriarRestaurenteProdutoDto,
    @Param('id') restaurenteId: string,
  ) {
    return this.produtoService.criarProduto(restaurenteId, produtoDto);
  }

  @Get(':id/produtos')
  async buscarProdutos(@Param('id') restauranteId: string): Promise<Produto[]> {
    return this.produtoService.buscarProdutos(restauranteId);
  }

  @Get(':id/produtos/:produtoId')
  async burcarProdutoId(
    @Param('id') restauranteId: string,
    @Param('produtoId') produtoId: string,
  ): Promise<Produto[]> {
    return this.produtoService.buscarProdutosPorId(restauranteId, produtoId);
  }

  @Delete(':id/produtos/:produtoId')
  async deletarProduto(
    @Param('id') restauranteId: string,
    @Param('produtoId') produtoId: string,
  ) {
    return this.produtoService.deletarProduto(restauranteId, produtoId);
  }
}
