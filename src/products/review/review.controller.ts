import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReviewDto } from '../dto/review.dto';
import { ReviewService } from './review.service';

@Controller('products')
export class ReviewController {

  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Post(':id/review')
  insertReview(
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: ReviewDto) {
      return this.reviewService.insertReview(id, body);
    }
}
