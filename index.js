const server = require('./api/server')

const PORT = 8080;

server.listen(PORT, ()=>{
	console.log(`You are now tuned in on ${PORT}, stayed tuned`)
})

