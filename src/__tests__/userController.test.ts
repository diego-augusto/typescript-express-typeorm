import app from "../application/Setup";
import request from "supertest";

describe("GET / - a simple api endpoint", () => {
    it("Hello API Request", async () => {
        const result = await request(app).get("/users");
        expect(result.status).toEqual(200);
    });
});