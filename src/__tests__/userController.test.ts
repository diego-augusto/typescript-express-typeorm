import Setup from "../application/Setup";
import request from "supertest";
import { Application } from "express";

let app : Application

beforeAll(async () => {
    app = await Setup.setup()
})

describe("GET / - a simple api endpoint", () => {
    it("Hello API Request", async () => {
        const result = await request(app).get("/users");
        expect(result.status).toEqual(200);
    });
});