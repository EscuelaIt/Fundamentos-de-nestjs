import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('varchar', { length: 50})
  name: string;

  @Column()
  description: string;

  @Column('int', { width: 5 })
  stock: number;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];
}
