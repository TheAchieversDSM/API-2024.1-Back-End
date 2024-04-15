import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
} from "typeorm";
import { Product } from "./product";


@Entity({ name: "product_summary" })
export class ProductSummary {
    @PrimaryGeneratedColumn({
        type: "int",
    })
    id!: number;

    @Column({
        type: "int",
    })
    amount!: number;

    @Column({
        type: "varchar",
    })
    text!: string;

    @OneToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product!: Product;

}