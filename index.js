require('dotenv').config();
const server = require('./api/server')

const PORT = process.env.PORT || 8000;

server.listen(PORT, ()=>{
	console.log(`You are now tuned in on ${PORT}, stayed tuned`)
})

