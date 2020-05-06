import "reflect-metadata";
import { Connection, createConnection, getConnection } from "typeorm";

export default class Database {

    private static connection: Connection | null = null

    static async getConnection() {

        if (this.connection === null || !this.connection.isConnected) {
            const connectionName = process.env.NODE_ENV || "development"
            this.connection = await createConnection(connectionName)
        }

        return this.connection
    }
}