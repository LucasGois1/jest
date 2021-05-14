const app = require('../src/app')
const supertest = require('supertest')

const request = supertest(app)

describe('Cadastro de usuário', () => {

    test('Deve cadastrar um usuário com sucesso', () => {
        const time = Date.now()
        const email = `${time}@gmail.com`
        const user = {
            name: "Victor",
            email,
            password: "123456"
        }
        return request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(email)
            })
            .catch((error) => {
                fail(error)
            })
    });
    test('Deve impedir que um usuario seja cadastrado com campos vazios', () => {
        const user = {
            name: "",
            email: "",
            password: ""
        }
        return request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toEqual(406)
            })
            .catch((error) => {
                fail(error)
            })
    });

    test("Deve impedir que um usuário se cadastre com um email já existente", () => {
        const user = {
            name: "Lucas",
            email: "lucas@gmail.com",
            password: "123456"
        }
        return request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toEqual(400)
            })
            .catch((error) => {
                fail(error)
            })
    })


});