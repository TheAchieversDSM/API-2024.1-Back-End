import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
} from "typeorm";

import { IsIn } from "class-validator";
import { Product } from "./product";

@Entity({ name: "comment" })
export class Comment {
    @PrimaryGeneratedColumn({
        type: "int",
    })
    id!: number;

    @Column({
        type: "varchar",
    })
    title!: string;

    @Column({
        type: "varchar",
    })
    text!: string;

    @Column({
        type: "int",
    })
    rating!: number;

    @Column({ type: "varchar", length: 1 })
    @IsIn(["M", "F"], { message: "Gender must be 'M' or 'F'" })
    gender!: string;

    @Column({type: "varchar", length: 2})
    state!: string;

    @OneToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product!: Product;

}