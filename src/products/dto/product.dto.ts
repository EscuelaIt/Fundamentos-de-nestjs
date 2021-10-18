import { IsInt, IsString } from "class-validator";

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  stock: number;
}
