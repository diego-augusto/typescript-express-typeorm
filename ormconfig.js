const path = require('path');

module.exports = [
	{
		name: 'default',
		type: 'sqlite',
		database: 'database.development.sqlite',
		synchronize: true,
		logging: false,
		entities: [
			path.resolve(__dirname, 'src/entities/*.js'),
		],
		migrations: [
			path.resolve(__dirname, 'src/migrations/*.js'),
		],
		subscribers: [
			path.resolve(__dirname, 'src/subscriber/*.js'),
		],
		cli: {
			entitiesDir: 'src/entities',
			migrationsDir: 'src/migrations',
			subscribersDir: 'src/subscribers',
		},
	},
	{
		name: 'test',
		type: 'sqlite',
		database: ':memory:',
		synchronize: true,
		logging: false,
		entities: [
			path.resolve(__dirname, 'src/entities/*.ts'),
		],
		migrations: [
			path.resolve(__dirname, 'src/migrations/*.ts'),
		],
		subscribers: [
			path.resolve(__dirname, 'src/subscriber/*.ts'),
		],
		cli: {
			entitiesDir: 'src/entities',
			migrationsDir: 'src/migrations',
			subscribersDir: 'src/subscribers',
		},
	},
];
