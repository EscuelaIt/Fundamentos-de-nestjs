import { 
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

@Controller('products')
export class ProductsController {
  @Get()
  getAll() {
    return 'Este es el listado de productos';
  }

  @Get(':id/:category')
  findWithCategory(@Param() params) {
    return `El producto que quieres recibir es ${params.id} de ${params.category}`;
  }

  @Get(':id')
  find(@Res() response, @Param('id') id: number) {
    if(id < 100) {
      return response.status(HttpStatus.OK).send(`El producto que quieres recibir es ${id}`);
    } else {
      return response.status(HttpStatus.NOT_FOUND).send('No he encontrado ese producto');
    }
  }

  // @Post()
  // create(@Body() body) {
  //   return `Estás creando un producto ${body.name} con el texto ${body.description}`;
  // }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(
    @Body('name') name: string, 
    @Body('description') description: string
  ) {
    return `Estás creando un producto ${name} con el texto ${description}.`;
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string
  ) {
    return `Estas actualizando el producto ${id}, colocando los datos ${name} con texto ${description}`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `Estás borrando el producto ${id}`;
  }
}
