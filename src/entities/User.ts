import { genSalt, hash } from 'bcryptjs'
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm'
import AppEntity from './AppEntity'
import { Store } from './Store'

@Entity()
export class User extends AppEntity {

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(type => Store, store => store.user)
    stores: Store[]

    @BeforeInsert()
    async hashPassword() {
        const salt = await genSalt(10)
        this.password = await hash(this.password, salt)
    }
}