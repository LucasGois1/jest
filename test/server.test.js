const app = require('../src/app')
const supertest = require('supertest')

const request = supertest(app)

test("A aplicação deve responder na porta 5000", () => {
    return request.get('/')
        .then((res) => {
            const result = res.statusCode
            expect(result).toEqual(200)
        })
        .catch((err) => {
            fail(err)
        })
})