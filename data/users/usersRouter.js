const userDB = require('./usersModel')

const router = require('express').Router()

router.get('/', (req,res)=>[
    //sanity check, may not be used!
    userDB.find()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
])

router.get('/:id', (req,res)=>{
    userDB.findById(req.params.id)
    .then(user=>{ 
        res.status(200).json(user)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router

