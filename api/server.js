const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

const authRouter = require('../data/auth/auth-router')
// const userRouter = require('../data/users/userRouter')
const casesRouter = require('../data/cases/caseRouter')
const personRouter = require('../data/person/personRouter')
const userRouter = require('../data/users/usersRouter')


server.use(express.json())
server.get('/', (req,res)=>{
	res.send('this port is good to GO!!')
})
server.use('/api/auth', authRouter)
server.use('/api/cases', casesRouter)
server.use('/api/person', personRouter)
server.use('/api/users', userRouter)

// server.use('/api/auth', userRouter)


module.exports = server
