const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

const authRouter = require('../data/auth/auth-router')
// const userRouter = require('../data/users/userRouter')
const casesRouter = require('../data/cases/caseRouter')


server.use(express.json())
server.use(cors())
server.get('/', (req,res)=>{
	res.send('this port is good to GO!!')
})
server.use('/api/auth', authRouter)
server.use('/api/cases', casesRouter)
// server.use('/api/auth', userRouter)


module.exports = server
