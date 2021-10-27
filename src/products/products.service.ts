import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getId(id: number): Promise<Product> {
    let product = await this.productRepository.findOne(id);
    if(product) {
      return product;
    }
    throw new NotFoundException('No puedo encontrar ese producto');
  }

  async insert(body: ProductDto): Promise<Product> {
    const product = this.productRepository.create(body);
    await this.productRepository.save(product);
    return product;
  }

  async update(id: number, body: ProductDto | ProductPatchDto): Promise<Product> {
    let inputProduct = {
      id,
      ...body
    }
    const product = await this.productRepository.preload(inputProduct);
    if(product) {
      return this.productRepository.save(product);
    }
    throw new NotFoundException(`No he encontrado el producto con id ${id}`);
  }

  async delete(id: number) {
    const product = await this.productRepository.findOne(id);
    if(product) {
      return this.productRepository.remove(product);
    }
    throw new NotFoundException(`No he encontrado el producto con id ${id}`);
  }

}
