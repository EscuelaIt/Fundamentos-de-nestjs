import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marco ideal para tus fotos 10x15',
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

  insert(body: any): Product {
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name: body.name,
        description: body.description,
      }
    ];
    return this.getId(this.lastId());
  }

  update(id: number, body: any): Product {
    let product: Product = {
      id,
      name: body.name,
      description: body.description,
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
