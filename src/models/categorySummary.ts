import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";


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

    @Column({
        type: "varchar",
    })
    type!: string;

    @Column({
        type: "varchar",
    })
    sentiment_review!: string;

}