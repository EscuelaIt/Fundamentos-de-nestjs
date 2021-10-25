import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ProductsModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
