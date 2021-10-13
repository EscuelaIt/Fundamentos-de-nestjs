import { Controller, Get } from '@nestjs/common';
import { Tag } from './tag.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {

  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAll(): Tag[] {
    return this.tagsService.getAll();
  }
}
