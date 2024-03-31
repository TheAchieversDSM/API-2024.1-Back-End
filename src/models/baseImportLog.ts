import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class BaseImportLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fileName!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;
}