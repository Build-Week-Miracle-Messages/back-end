const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../usersModel');
const { validateUser } = require('../usersHelpers'); // the sole existence of this helper file is to check whether the user is logged in or not. It is a middleware that can check the for pass and user lengths

router.post('/register', (req,res)=>{
	let user = req.body // using let because it will be updated later
	const validateResult = validateUser(user)
	console.log(validateResult)
	if (validateResult.isSuccessful === true){//checks to see if a valid username and password is being sent
		const hash = bcrypt.hashSync(user.password, 10);
		user.password = hash;
		Users.add(user)
		.then(saved =>{
			res.status(201).json(saved)
		})
		.catch(err=>{
			res.status(500).json(error)
		})
	}else{
		res.status(400).json({
			message:"invalid information about the user,See errors for details",
			errors: validateResult.errors
		})
	}

})

router.post('/login', (req,res)=>{
	let {username, password } = req.body
	console.log(username, password)

	Users.findBy({username})
	.first()//should be unique
	.then(user=>{
		if(user && bcrypt.compareSync(password, user.password)){
			const token = getJwtToken(user);
			res.status(200).json({
				...user, token:token 
			});
		} else{
			res.status(401).json({message:'invalid credentials'})
		}
	})
	.catch(err=>{
		console.log(err)
		res.status(500).json({error:"Something went wrong"})
	})
})

function getJwtToken(user){
	const payload = {
		sub: user.id,
		username: user.username,
		iat: Date.now()
	}
	console.log('payload')
	  const secret = process.env.JWT_SECRET || 'is it secret, is it safe'//leaving here for now
	  const options = {
		expiresIn: '1d', // show other available options in the library's documentation
		//"alg": "HS256", --> alg by default
		//"typ": "JWT"
	};
	return jwt.sign(payload, secret, options);
}

module.exports = router;

