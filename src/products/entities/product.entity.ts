import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Review } from "./review.entity";
import { Size } from "./size.entity";

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

  @ManyToMany(() => Size, size => size.products, { cascade: true })
  @JoinTable()
  sizes: Size[];
}
