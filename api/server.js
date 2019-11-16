const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

server.use(express.json())
server.get('/', (req,res)=>{
	res.send('this port is good to GO!!')
})

module.exports = server
