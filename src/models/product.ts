import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id!: number;

  @Column({
    type: "varchar",
  })
  name!: string;

  @Column({
    type: "varchar",
    nullable: true, 
  })
  category?: string; 

  @Column({
    type: "varchar",
    nullable: true, 
  })
  subcategory?: string; 
}
