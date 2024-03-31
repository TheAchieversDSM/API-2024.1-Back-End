import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
} from "typeorm";
import { Comment } from "./comment";


@Entity({ name: "summary" })
export class Summary {
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

    @OneToOne(() => Comment)
    @JoinColumn({ name: "comment_id" })
    comment!: Comment;

}