const router = require('express').Router()
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

//const Users = require('../users/user-model')
//const { validateUser } = require('../users/users-helpers') // the sole existence of this helper file is to check whether the user is logged in or not. It is a middleware that can check the for pass and user lengths

router.post('/register', (req,res)=>{
	let user = req.body // using let because it will be updated later
	const validateUser = validateUser(user)
	if (validateResult.isSuccessful === true){//checks to see if a valid username and password is being sent
		const hash = bcrypt.hashSync(user.password, 10);
		user.password = hash;
		Users.add(user)
		.then(saved =>{
			res.status(201).json(saved)
		})
		.catch(err=>{
			console.log(err)
			res.status(500).json(error)
		})
	}else{
		res.status(400).json({
			message:"invalid information about the user,See errors for details",
			errors: validateResult.errors
		})
	}

})

module.exports = router;

