import request from "supertest";
import { Application } from "express";
import Setup from "../application/Setup";
import { getConnection, Connection } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

let app: Application
let connection: Connection

beforeEach(async () => {
    app = await Setup.setup()
    connection = getConnection(process.env.NODE_ENV)
})

afterEach(async () => {
    await connection.synchronize(true)
})

afterAll(async () => {
    await connection.close()
})

describe("users", () => {
    test("get all", async () => {

        const userRepository = connection.getCustomRepository(UserRepository)

        const user = new User()

        user.email = "user@email.com"
        user.name = "New User"
        user.password = "User@1234"

        await userRepository.save(user)

        const result = await request(app).get("/users");
        expect(result.status).toEqual(200);
        expect(result.body).toHaveLength(1);

        expect(result.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ email: user.email, name: user.name })
        ]));
    });

    test("get by id", async () => {
        const userRepository = connection.getCustomRepository(UserRepository)

        const user = new User()

        user.email = "user@email.com"
        user.name = "New User"
        user.password = "User@1234"

        await userRepository.save(user)

        const result = await request(app).get(`/users/${user.publicId}`);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(expect.objectContaining({ email: user.email, name: user.name }));
    })
});