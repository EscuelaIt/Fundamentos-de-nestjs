import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { Size } from './entities/size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Review, Size])],
  controllers: [ProductsController, ReviewController],
  providers: [ProductsService, ReviewService],
})
export class ProductsModule {}
