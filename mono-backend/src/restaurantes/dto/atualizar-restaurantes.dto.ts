import { PartialType } from '@nestjs/swagger';
import { CriarRestauranteDto } from './criar-restaurantes.dto';

export class AtualizarRestauranteDto extends PartialType(CriarRestauranteDto) {}
