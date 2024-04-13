import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
} from "typeorm";
import { Product } from "./product";


@Entity({ name: "category_summary" })
export class CategorySummary {
    @PrimaryGeneratedColumn({
        type: "int",
    })
    id!: number;

    @Column({
        type: "varchar",
    })
    category!: string;

    @Column({
        type: "int",
    })
    amount!: number;

    @Column({
        type: "varchar",
    })
    text!: string;

}