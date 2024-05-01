import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Comment } from "./comment";

@Entity({ name: "product" })
export class Product {
    @PrimaryColumn({ type: "bigint", name: "id"})
    id!: number;

    @Column({ type: "varchar", nullable:true })
    name?: string;

    @Column({ type: "varchar", nullable: true })
    category?: string;

    @Column({ type: "varchar", nullable: true })
    subcategory?: string;

    @Column({ type: "varchar", nullable: true })
    externalId?: number;

    @Column({ type: "varchar", length: 2, nullable: true})
    reviewer_state!: string;

    @OneToMany(() => Comment, comment => comment.product)
    comments?: Comment[];
}