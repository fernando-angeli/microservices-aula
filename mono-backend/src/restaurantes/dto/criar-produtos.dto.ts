import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CriarRestaurenteProdutoDto {
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  @MaxLength(100)
  description: string;

  @ApiProperty({ type: String })
  image: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  price: number;
}
