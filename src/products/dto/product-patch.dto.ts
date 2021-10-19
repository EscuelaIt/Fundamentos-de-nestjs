import { PartialType } from '@nestjs/mapped-types';
import { ProductDto } from './product.dto';

export class ProductPatchDto extends PartialType(ProductDto) {}
