import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
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

  getAll() {
    return this.products;
  }

  getId(id: number) {
    return this.products.find((item) => item.id == id);
  }

  insert(body: any) {
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

  update(id: number, body: any) {
    let product = {
      id,
      name: body.name,
      description: body.description,
    }
    this.products = this.products.map((item) => {
      return item.id == id ? product : item;
    });
    return this.getId(id);
  }

  delete(id: number) {
    this.products = this.products.filter((item) => item.id != id);
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }

}
