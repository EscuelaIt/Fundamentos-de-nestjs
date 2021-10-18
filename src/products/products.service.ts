import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
      stock: 0,
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marco ideal para tus fotos 10x15',
      stock: 12,
    }
  ];

  getAll(): Product[] {
    return this.products;
  }

  getId(id: number): Product {
    let product = this.products.find((item) => item.id == id);
    if(product) {
      return product;
    }
    throw new NotFoundException('No puedo encontrar ese producto');
  }

  insert(body: ProductDto): Product {
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name: body.name,
        description: body.description,
        stock: body.stock,
      }
    ];
    return this.getId(this.lastId());
  }

  update(id: number, body: ProductDto): Product {
    let product: Product = {
      id,
      name: body.name,
      description: body.description,
      stock: body.stock,
    }
    this.products = this.products.map((item) => {
      return item.id == id ? product : item;
    });
    return this.getId(id);
  }

  delete(id: number): void {
    this.products = this.products.filter((item) => item.id != id);
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }

}
