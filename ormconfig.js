const path = require('path')

module.exports = [
    {
        "name" : "development",
        "type": "sqlite",
        "database": "database.dev.sqlite",
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
            "entitiesDir": "src/entities",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    },
    {
        "name" : "test",
        "type": "sqlite",
        "database": "database.test.sqlite",
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
            "entitiesDir": "src/entities",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }
]