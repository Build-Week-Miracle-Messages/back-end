const db = require('../data/dbConfig')
const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server.js'); // this is our first red, file doesn't exist yet

describe('user server', ()=>{
    beforeEach(async () => {
        // this function executes and clears out the table before each test
        await db('connect').truncate();
        await db('cases').truncate();
        await db('person').truncate();
        await db('users').truncate();
      });
    describe('POST /api/auth/register',()=>{
        it('should return a 200 response', async ()=>{
            return request(server)
            .post('/api/auth/register').send({username:"uzias", password:"12345", email:"myemail@mail.com", name:"uziasrivera"})
            .then(res=>{
                console.log(res.type)
                expect(res.status).toBe(200)
            })
        })
    })
    describe('POST /api/auth/register',()=>{
        it('should return a token', async ()=>{
            return request(server)
            .post('/api/auth/register').send({username:"rivera", password:"12345", email:"mynewemail@mail.com", name:"bill"})
            .then(res=>{
                console.log(res.type)
                expect(res.body.token).toBeTruthy()
            })
        })
    })
    describe('POST /api/auth/login',()=>{
        it('should return a json type', async ()=>{
            return request(server)
            .post('/api/auth/login').send({username:"uziasr", password:"1234"})
            .then(res=>{
                expect(res.type).toMatch(/json/i)
            })
        })
        it('should return a truthy value', async ()=>{
            return request(server)
            .post('/api/auth/login').send({username:"uziasr", password:"1234"})
            .then(res=>{
                console.log(res.body)
                expect(res.body).toBeTruthy()
            })
        })
    })
})

describe('server person', ()=>{
    describe('POST /api/cases',()=>{
        it('should return object', async ()=>{
            return request(server)
            .post('/api/cases').send({
                "name":"bill",
                "age": 34,
                "home_town": "los angeles",
                "current_city": "Dallas",
                "contact": "uzias@gmail.com",
                "sensitive": false,
                "connect_name": "uzias",
                "connect_relationship": "brother",
                "connect_location": "peru"
                }).then(res=>{
                    expect(res.type).toMatch(/json/i)
                })
        })
    })
    describe('POST /api/cases',()=>{
        it('should return 200', async ()=>{
            return request(server)
            .post('/api/cases').send({
                "name":"bill",
                "age": 34,
                "home_town": "los angeles",
                "current_city": "Dallas",
                "contact": "uzias@gmail.com",
                "sensitive": false,
                "connect_name": "uzias",
                "connect_relationship": "brother",
                "connect_location": "peru"
                }).then(res=>{
                    expect(res.type).toMatch(/json/i)
                })
        })
    })
    describe('GET /api/cases/all',()=>{
        it('should return an object', async ()=>{
            return request(server)
            .get('/api/cases/all')
            .then(res=>{
                console.log(res.type)
                expect(res.body).toBeInstanceOf(Object)
            })
        })
    })
    describe('GET /api/cases/all',()=>{
        it('should return an json', async ()=>{
            return request(server)
            .get('/api/cases/all')
            .then(res=>{
                console.log(res.type)
                expect(res.type).toMatch(/json/i)
            })
        })
    })
    describe('GET /api/cases/current',()=>{
        it('should return an object', async ()=>{
            return request(server)
            .get('/api/cases/current')
            .then(res=>{
                console.log(res.type)
                expect(res.body).toBeInstanceOf(Object)
            })
        })
    })
    describe('GET /api/cases/current',()=>{
        it('should return an json', async ()=>{
            return request(server)
            .get('/api/cases/current')
            .then(res=>{
                console.log(res.type)
                expect(res.type).toMatch(/json/i)
            })
        })
    })
    describe('PUT /api/cases/person/:id',()=>{
        it('should return an object', async ()=>{
            return request(server)
            .get('/api/cases/current/1')
            .then(res=>{
                console.log(res.type)
                expect(res.body).toBeInstanceOf(Object)
            })
        })
    })
    describe('PUT /api/cases/person/:id',()=>{
        it('should return a truthy value', async ()=>{
            return request(server)
            .get('/api/cases/current/1')
            .then(res=>{
                console.log(res.type)
                expect(res.type).toBeTruthy()
            })
        })
    })
    ///api/cases/5
    describe('DELETE /api/cases/:id',()=>{
        it('should return an json', async ()=>{
            return request(server)
            .get('/api/cases/current/1')
            .then(res=>{
                console.log(res.type)
                expect(res.type).toBeTruthy()
            })
        })
    })
    describe('DELETE /api/cases/:id',()=>{
        it('should return an json', async ()=>{
            return request(server)
            .get('/api/cases/current/2')
            .then(res=>{
                console.log(res.type)
                expect(res.type).toBeTruthy()
            })
        })
    })
})