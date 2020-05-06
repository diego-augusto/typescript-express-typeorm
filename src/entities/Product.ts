import { Column, Entity, ManyToOne } from "typeorm";
import AppEntity from "./AppEntity";
import { Store } from './Store'

@Entity()
export class Product extends AppEntity {

    @Column()
    name: string;

    @Column()
    quantity: number;

    @ManyToOne(type => Store, store => store.products)
    store: Store;
}