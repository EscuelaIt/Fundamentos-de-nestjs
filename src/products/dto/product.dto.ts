import { IsInt, IsString, Length, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @IsString({
    message: 'El nombre se ha de indicar'
  })
  name: string;

  @ApiProperty()
  @IsString()
  @Length(10, 50)
  description: string;

  @ApiProperty()
  @IsInt()
  @Min(0, { message: 'El stock puede ser cero o superior'})
  stock: number;
}
