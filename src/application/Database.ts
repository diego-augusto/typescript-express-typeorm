import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

export default class Database {

    private static connection: Connection | null = null

    static async getConnection() {

        if (this.connection === null) {
            const connectionName = process.env.NODE_ENV || "development"

            console.log("connectionName:", connectionName)

            this.connection = await createConnection(connectionName)
        }

        return this.connection
    }
}