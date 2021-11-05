import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>
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
    const sizes = await Promise.all(body.sizes.map(size => this.selectOrCreateSize(size)));
    const product = this.productRepository.create({
      ...body,
      sizes
    });
    await this.productRepository.save(product);
    return product;
  }

  async update(id: number, body: ProductDto | ProductPatchDto): Promise<Product> {
    const sizes = body.sizes && await Promise.all(body.sizes.map(size => this.selectOrCreateSize(size)));
    let inputProduct = {
      id,
      ...body,
      sizes,
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

  private async selectOrCreateSize(size: string): Promise<Size> {
    let sizeEntity = await this.sizeRepository.findOne({ size });
    if(sizeEntity) {
      return sizeEntity;
    }
    return this.sizeRepository.create({ size });
  }
}
