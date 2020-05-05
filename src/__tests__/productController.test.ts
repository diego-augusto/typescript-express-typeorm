import request from "supertest";
import { Application } from "express";
import { getConnection, Connection } from "typeorm";
import Setup from "../application/Setup";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { StoreRepository } from "../repositories/StoreRepository";
import { Store } from "../entities/Store";
import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../entities/Product";

let app: Application
let connection: Connection

let userRepository : UserRepository
let storeRepository : StoreRepository
let productRepository : ProductRepository

beforeEach(async () => {
    app = await Setup.setup()
    connection = getConnection(process.env.NODE_ENV)
    userRepository = connection.getCustomRepository(UserRepository)
    storeRepository = connection.getCustomRepository(StoreRepository)
    productRepository = connection.getCustomRepository(ProductRepository)
})

afterEach(async () => {
    await connection.synchronize(true)
})

afterAll(async () => {
    await connection.close()
})

describe("store", () => {
    test("get all", async () => {

        const user = new User()

        user.email = "user@email.com"
        user.name = "New User"
        user.password = "User@1234"

        await userRepository.save(user)

        const store = new Store()

        store.name = "My first Store"
        store.user = user

        await storeRepository.save(store)

        const product = new Product()

        product.name = "My first Store"
        product.quantity = 10
        product.store = store

        await productRepository.save(product)

        const result = await request(app).get("/products");
        expect(result.status).toEqual(200);
        expect(result.body).toHaveLength(1);

        expect(result.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: product.name, quantity: product.quantity })
        ]));
    });

    test("get by id", async () => {

        const user = new User()

        user.email = "user@email.com"
        user.name = "New User"
        user.password = "User@1234"

        await userRepository.save(user)

        const store = new Store()

        store.name = "My first Store"
        store.user = user

        await storeRepository.save(store)

        const product = new Product()

        product.name = "My first Store"
        product.quantity = 10
        product.store = store

        await productRepository.save(product)

        const result = await request(app).get(`/products/${product.publicId}`);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(expect.objectContaining({ name: product.name, quantity: product.quantity }));
    })
});