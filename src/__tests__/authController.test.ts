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

describe("signin", () => {
    test("valid user", async () => {

        const userRepository = connection.getCustomRepository(UserRepository)

        const user = new User()

        user.email = "user@email.com"
        user.name = "New User"
        user.password = "User@1234"

        await userRepository.save(user)

        const result = await request(app).post("/signin").send({
            email: user.email,
            password: "User@1234",
        });

        expect(result.status).toEqual(200);
        expect(result.body.token).not.toBeNull();
    });
});

describe("signup", () => {
    test("valid user", async () => {

        const result = await request(app).post("/signup").send({
            name: "New User",
            email: "user@email.com",
            password: "User@1234",
        });

        expect(result.status).toEqual(200);
        expect(result.body.token).not.toBeNull();
        expect(result.body.id).toBeGreaterThan(0);
    });
});