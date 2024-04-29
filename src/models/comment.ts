import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { IsIn } from "class-validator";
import { Product } from "./product";

@Entity({ name: "comment" })
export class Comment {
    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column({ type: "varchar", nullable: true})
    title!: string;

    @Column({ type: "varchar", nullable: true})
    text!: string;

    @Column({ type: "int", nullable: true})
    rating!: number;

    @Column({ type: "date", nullable: true})
    date!: Date;

    @Column({ type: "varchar", length: 1, nullable: true})
    @IsIn(["M", "F"], { message: "Gender must be 'M' or 'F'" })
    gender!: string;

    @Column({ type: "varchar", length: 2, nullable: true})
    state!: string;

    @Column({ type: "varchar", length: 2, nullable: true})
    reviewer_state!: string;

    @ManyToOne(() => Product, product => product.comments)
    product!: Product;
}
