import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class ReviewDto {
  @Length(2, 50)
  @IsString()
  userName: string;

  @Length(5, 250)
  @IsString()
  review: string;

  @Min(1)
  @Max(5)
  @IsInt()
  valoration: number;
}