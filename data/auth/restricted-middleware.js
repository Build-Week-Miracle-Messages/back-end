const brcrypt = require('bcryptjs')// imported to check the hashed password

//const Users = require('model needs to imported here')

module.exports = (req, res, next) =>{
if(req.session && req.session.username){
	next()//upon success, you will carry on
}else{
	res.status(401).json({you:"cannot pass"})//double check the status code
}
}

