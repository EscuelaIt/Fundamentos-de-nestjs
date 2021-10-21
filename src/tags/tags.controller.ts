import { Controller, Get, Param } from '@nestjs/common';
import { Tag } from './tag.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {

  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAll(): Tag[] {
    return this.tagsService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    console.log(id, typeof id);
    return id;
  }
}
