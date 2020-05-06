import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AppEntity from "./AppEntity";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Store extends AppEntity {

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.stores)
    user: User;

    @OneToMany(type => Product, product => product.store)
    products: Product[];
}