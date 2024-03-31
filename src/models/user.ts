import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity({name: "user"})
export class User {
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
  })
  email!: string;

  @Column({
    type: "varchar",
  })
  password!: string;

}