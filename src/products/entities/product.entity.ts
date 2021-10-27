import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
