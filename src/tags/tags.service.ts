import { Injectable } from '@nestjs/common';
import { Tag } from './tag.interface';

@Injectable()
export class TagsService {
  private tags: Tag[] = [
    {
      id: 1,
      name: 'Muebles',
      slug: 'muebles'
    },
    {
      id: 2,
      name: 'Accesorios',
      slug: 'accesorios'
    }, 
  ];

  getAll() :Tag[] {
    return this.tags;
  }
}
