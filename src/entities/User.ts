import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { hash, genSalt } from "bcryptjs";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt)
    }
}