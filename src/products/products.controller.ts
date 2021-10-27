import { 
  BadRequestException,
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  Put, 
  Res,
  UsePipes
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  find(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Product {
    return this.productsService.getId(id);
  }

  @Post()
  // @UsePipes(new ValidationPipe())
  async create(@Body() body: ProductDto): Promise<Product> {
    return this.productsService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() body: ProductDto
  ): Promise<Product> {
    console.log(body);
    return this.productsService.update(id, body);
  }

  @Patch(':id')
  patch(
    @Param('id') id: number,
    @Body() body: ProductPatchDto
  ) {
    return this.productsService.patch(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): string {
    this.productsService.delete(id);
    return `Borrado`;
  }
}
