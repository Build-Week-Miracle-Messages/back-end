const router = require('express').Router()
const personDB = require('./personModel')
const restricted = require('../auth/restricted-middleware')

router.get('/:id', (req,res)=>{
    personDB.get(req.params.id)
    .then(people=>{
        res.status(200).json(people)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router