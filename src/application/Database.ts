import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

export default class Database {

    private static connection: Connection | null = null

    static async getConnection() {

        if (this.connection === null) {
            this.connection = await createConnection()
        }

        return this.connection
    }
}