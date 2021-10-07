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
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  find(@Res() response, @Param('id') id: number) {
    let product = this.productsService.getId(id);
    if(product) {
      return response.status(HttpStatus.OK).send(product);
    } else {
      return response.status(HttpStatus.NOT_FOUND).send('No he encontrado ese producto');
    }
  }

  @Post()
  create(@Body() body) {
    return this.productsService.insert(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    this.productsService.delete(id);
    return `Borrado`;
  }
}
