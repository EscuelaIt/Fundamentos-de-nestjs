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
  Query, 
  Res,
  UsePipes
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto';
import { ValidationPipe } from '@nestjs/common';
import { QueryProductsDto } from './dto/query-products.dto';
import { ConfigService } from '@nestjs/config';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService
  ) { }

  @Get()
  getAll(@Query() query: QueryProductsDto) {
    const defaultQuery = {
      limit: 10,
      order: 'name',
      query: '',
    }
    query = { ...defaultQuery, ...query };
    return this.productsService.getAll(query);
  }

  @Get(':id')
  find(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return this.productsService.getId(id);
  }

  @Post()
  async create(@Body() body: ProductDto): Promise<Product> {
    return this.productsService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() body: ProductDto
  ): Promise<Product> {
    return this.productsService.update(id, body);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @Body() body: ProductPatchDto
  ) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
