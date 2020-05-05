import { Entity, Column, ManyToOne } from "typeorm";
import { Store } from './Store'
import AppEntity from "./AppEntity";

@Entity()
export class Product extends AppEntity {

    @Column()
    name: string;

    @Column()
    quantity: number;

    @ManyToOne(type => Store, store => store.products)
    store: Store;
}