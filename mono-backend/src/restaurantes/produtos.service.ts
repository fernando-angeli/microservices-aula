import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarRestaurenteProdutoDto } from './dto/criar-produtos.dto';
import { Produto } from './schema/produtos.schema';
import { Restaurante } from './schema/restaurantes.schema';

@Injectable()
export class ProdutosService {
  protected readonly logger = new Logger(ProdutosService.name);

  constructor(
    @InjectModel('Produto') private produtoModel: Model<Produto>, //@InjectModel('Restaurante') private restauranteModel: Model<Restaurante>,
  ) {}

  async criarProduto(
    restauranteId: string,
    produtoDto: CriarRestaurenteProdutoDto,
  ): Promise<Produto> {
    const criarProduto = { ...produtoDto, restauranteId: restauranteId };
    this.logger.debug('criarProduto ' + JSON.stringify(criarProduto));
    return await this.produtoModel.create(criarProduto);
  }

  async buscarProdutos(restaurenteId): Promise<Produto[]> {
    this.logger.debug('buscarTodosOsProdutos');
    return await this.produtoModel.find({ restaurenteId: restaurenteId });
  }

  async buscarProdutosPorId(restaurenteId, produtoId): Promise<Produto[]> {
    this.logger.debug('buscarProdutoPorId');
    return await this.produtoModel.find({
      _id: produtoId,
      restauranteId: restaurenteId,
    });
  }

  async deletarProduto(restauranteId: string, produtoId: string) {
    const produto = await this.produtoModel.findByIdAndDelete({
      _id: produtoId,
      restauranteId: restauranteId,
    });
    return await produto.deleteOne();
  }
}
