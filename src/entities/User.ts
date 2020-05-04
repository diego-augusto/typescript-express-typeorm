import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { hash, genSalt } from "bcryptjs";
import AppEntity from "./AppEntity";

@Entity()
export class User extends AppEntity {

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