import request from "supertest";
import { Application } from "express";
import { getConnection, Connection } from "typeorm";
import Setup from "../application/Setup";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { StoreRepository } from "../repositories/StoreRepository";
import { Store } from "../entities/Store";

let app: Application
let connection: Connection
let userRepository : UserRepository
let storeRepository : StoreRepository

beforeEach(async () => {
    app = await Setup.setup()
    connection = getConnection(process.env.NODE_ENV)
    userRepository = connection.getCustomRepository(UserRepository)
    storeRepository = connection.getCustomRepository(StoreRepository)
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

        const result = await request(app).get("/stores");
        expect(result.status).toEqual(200);
        expect(result.body).toHaveLength(1);

        expect(result.body).toEqual(expect.arrayContaining([
            expect.objectContaining(
                {
                    name: store.name,
                    publicId: store.publicId,
                }
            )
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

        const result = await request(app).get(`/stores/${store.publicId}`);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(expect.objectContaining(
            {
                publicId: store.publicId,
                name: store.name,
            }
        ));
    })
});