import { 
  BadRequestException,
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Param, 
  Post, 
  Put, 
  Res
} from '@nestjs/common';
import { Product } from './product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Product {
    return this.productsService.getId(id);
  }

  @Post()
  create(@Body() body): Product {
    return this.productsService.insert(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body): Product {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): string {
    this.productsService.delete(id);
    return `Borrado`;
  }
}
