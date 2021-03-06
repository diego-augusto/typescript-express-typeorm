import { Application } from 'express'
import request from 'supertest'
import { Connection, getConnection } from 'typeorm'
import Setup from '../application/Setup'
import { User } from '../entities'
import { UserRepository } from '../repositories'
import TokenUtils from '../utils/TokenUtils'

let app: Application
let connection: Connection

let userRepository: UserRepository

beforeEach(async () => {
    app = await Setup.setup()
    connection = getConnection(process.env.NODE_ENV)
    userRepository = connection.getCustomRepository(UserRepository)
})

afterEach(async () => {
    await connection.synchronize(true)
})

afterAll(async () => {
    await connection.close()
})

describe('users', () => {
    test('get all', async () => {

        const user = new User()

        user.email = 'user@email.com'
        user.name = 'New User'
        user.password = 'User@1234'

        await userRepository.save(user)

        const token = TokenUtils.generateToken(user).token

        const result = await request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .set('Authorization', token)

        expect(result.status).toEqual(200)
        expect(result.body).toHaveLength(1)

        expect(result.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ email: user.email, name: user.name })
        ]))
    })

    test('get by id', async () => {

        const user = new User()

        user.email = 'user@email.com'
        user.name = 'New User'
        user.password = 'User@1234'

        await userRepository.save(user)

        const token = TokenUtils.generateToken(user).token

        const result = await request(app).get(`/users/${user.publicId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)

        expect(result.status).toEqual(200)
        expect(result.body).toEqual(expect.objectContaining({ email: user.email, name: user.name }))
    })

    test('get not found', async () => {

        const user = new User()

        user.email = 'user@email.com'
        user.name = 'New User'
        user.password = 'User@1234'

        await userRepository.save(user)

        const token = TokenUtils.generateToken(user).token

        const result = await request(app).get(`/users/-1`)
            .set('Accept', 'application/json')
            .set('Authorization', token)

        expect(result.status).toEqual(404)
    })

    test('without token', async () => {

        const user = new User()

        user.email = 'user@email.com'
        user.name = 'New User'
        user.password = 'User@1234'

        await userRepository.save(user)

        const result = await request(app).get(`/users/${user.publicId}`)
            .set('Accept', 'application/json')

        expect(result.status).toEqual(401)
    })
})