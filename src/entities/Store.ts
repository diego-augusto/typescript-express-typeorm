import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import AppEntity from "./AppEntity";
import { Product } from "./Product";

@Entity()
export class Store extends AppEntity {

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.stores)
    user: User;

    @OneToMany(type => Product, product => product.store)
    products: Product[];
}