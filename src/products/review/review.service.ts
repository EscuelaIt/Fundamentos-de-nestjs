import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDto } from '../dto/review.dto';
import { Product } from '../entities/product.entity';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async insertReview(id: number, body: ReviewDto) {
    const product = await this.productRepository.findOne(id);
    if(product) {
      const review = this.reviewRepository.create(body);
      review.product = product;
      return await this.reviewRepository.save(review);
    }
    throw new NotFoundException(`El producto ${id} no existe`);
  }
}
