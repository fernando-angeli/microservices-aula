import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';

class Address {
  @ApiProperty()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  district: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  complement: string;
}

export class CriarRestauranteDto {
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ type: String })
  name: string;

  @MaxLength(100)
  @ApiProperty({ type: String })
  description: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({ type: Address })
  @Type(() => Address)
  address: Address;
}
