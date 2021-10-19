import { IsInt, IsString, Min } from "class-validator";

export class ProductDto {
  @IsString({
    message: 'El nombre se ha de indicar'
  })
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0, { message: 'El stock puede ser cero o superior'})
  stock: number;
}
