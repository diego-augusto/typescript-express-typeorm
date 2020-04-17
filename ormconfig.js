const path = require('path')

module.exports = {
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": true,
    "logging": false,
    "entities": [
        path.resolve(__dirname, "src/entities/*.ts")
    ],
    "migrations": [
        path.resolve(__dirname, "src/migration/*.ts")
    ],
    "subscribers": [
        path.resolve(__dirname, "src/subscriber/*.ts")
    ],
    "cli": {
       "entitiesDir": path.resolve(__dirname, "dest/entities"),
       "migrationsDir": path.resolve(__dirname, "dest/migration"),
       "subscribersDir": path.resolve(__dirname, "dest/subscriber")
    }
 }