const supertest = require('supertest')
const { makeDatabase } = require('../database')
const app = require('../app')

describe('POST /auth/login', () => {
  let database
  let request

  beforeAll(async () => {
    database = makeDatabase(process.env.DATABASE_URL_TEST)
    request = supertest(app)
  })

  afterAll(async () => {
    await database.close()
  })

  describe('Given usernameOrEmail and password', () => {
    it('should return 200 and token', async () => {
      const res = await request.post('/auth/login').send({
        usernameOrEmail: 'phuocnov',
        password: '123456'
      })
      expect(res.status).toBe(200)
      expect(res.body.access_token).toBeDefined()
    })
  })

  describe('Missing usernameOrEmail or password', () => {
    it('should return 400', async () => {
      const res = await request.post('/auth/login').send({
        usernameOrEmail: 'phuocnov'
      })
      expect(res.status).toBe(400)
    })

    it('should return 400', async () => {
      const res = await request.post('/auth/login').send({
        password: '123456'
      })
      expect(res.status).toBe(400)
    })
  })

  describe('Wrong usernameOrEmail or password', () => {
    it('should return 401', async () => {
      const res = await request.post('/auth/login').send({
        usernameOrEmail: 'phuocnov',
        password: '1234567'
      })
      expect(res.status).toBe(401)
    })

    it('should return 401', async () => {
      const res = await request.post('/auth/login').send({
        usernameOrEmail: 'wrongusername',
        password: '123456'
      })
      expect(res.status).toBe(401)
    })
  })
})
