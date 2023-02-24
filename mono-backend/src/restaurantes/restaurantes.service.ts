/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarRestauranteDto } from './dto/atualizar-restaurantes.dto';
import { CriarRestauranteDto } from './dto/criar-restaurantes.dto';
import { Restaurante, RestauranteDocument } from './schema/restaurantes.schema';
import { ObjectID } from 'bson';

@Injectable()
export class RestaurantesService {
  validarId = (id: string) => {
    if (!ObjectID.isValid(id)) {
      throw new HttpException(
        'Formato do identificador inválido',
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  protected readonly logger = new Logger(RestaurantesService.name);

  constructor(
    @InjectModel('Restaurante')
    private restauranteModel: Model<RestauranteDocument>,
  ) {}

  async buscarRestaurantes(): Promise<Restaurante[]> {
    this.logger.debug('buscarRestaurantes');
    return await this.restauranteModel.find({});
  }

  async buscarRestaurantesPorId(restauranteId: string): Promise<Restaurante> {
    this.logger.debug(`buscarRestaurantes por id: ${restauranteId}`);
    return await this.restauranteModel.findById({ _id: restauranteId });
  }

  async criarRestaurente(
    restauranteDto: CriarRestauranteDto,
  ): Promise<Restaurante> {
    const criarRestaurante = { ...restauranteDto };
    this.logger.debug('criarRestaurante ' + JSON.stringify(criarRestaurante));
    return await this.restauranteModel.create(criarRestaurante);
  }

  async atualizarRestaurentePorId(
    restauranteId: string,
    restauranteDto: AtualizarRestauranteDto,
  ): Promise<Restaurante> {
    this.logger.debug(
      'atualizarRestaurante id: ' + JSON.stringify(restauranteId),
    );
    this.logger.debug(
      'atualizarRestaurante dto: ' + JSON.stringify(restauranteDto),
    );

    const restaurante = await this.restauranteModel.findById(restauranteId);
    this.logger.debug('restaurante ' + JSON.stringify(restaurante));

    await restaurante.updateOne(restauranteDto);
    return await this.restauranteModel.findById(restauranteId);
  }

  async deletarRestaurante(restauranteId: string) {
    this.validarId(restauranteId);
    this.logger.debug('deletarRestaurantePorId id: ' + restauranteId);

    const restaurante = await this.restauranteModel.findOneAndDelete({
      _id: restauranteId,
    });

    if (!restaurante) {
      this.logger.error(`Restaurante de id[${restauranteId}] não encontrado.`);
      throw new HttpException(
        `Restaurante de id[${restauranteId}] não encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return restaurante;
  }
}
