import { Application } from "express";
import request from "supertest";
import { Connection, getConnection } from "typeorm";
import Setup from "../application/Setup";
import { Product } from "../entities/Product";
import { Store } from "../entities/Store";
import { User } from "../entities/User";
import { ProductRepository } from "../repositories/ProductRepository";
import { StoreRepository } from "../repositories/StoreRepository";
import { UserRepository } from "../repositories/UserRepository";
import TokenUtils from "../utils/TokenUtils";

let app: Application
let connection: Connection

let userRepository: UserRepository
let storeRepository: StoreRepository
let productRepository: ProductRepository

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

        const token = TokenUtils.generateToken(user).token

        const result = await request(app).get("/products")
            .set("Accept", "application/json")
            .set("Authorization", token);

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

        const token = TokenUtils.generateToken(user).token

        const result = await request(app).get(`/products/${product.publicId}`)
            .set("Accept", "application/json")
            .set("Authorization", token);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual(expect.objectContaining({ name: product.name, quantity: product.quantity }));
    })


    test("not found", async () => {

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

        const token = TokenUtils.generateToken(user).token

        const result = await request(app).get(`/products/-1`)
            .set("Accept", "application/json")
            .set("Authorization", token);

        expect(result.status).toEqual(404);
    })

    test("without token", async () => {

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

        const result = await request(app).get(`/products/${product.publicId}`)
            .set("Accept", "application/json")

        expect(result.status).toEqual(401);
    })

});