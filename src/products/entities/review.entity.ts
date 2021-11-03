import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('reviews')
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  userName: string;

  @Column('varchar', { length: 250 })
  review: string;
  
  @Column('int', { width: 1 })
  valoration: number;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;
}
