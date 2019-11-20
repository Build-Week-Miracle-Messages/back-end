const router = require('express').Router()
const missingDB = require('./missingModel')
const restricted = require('../auth/restricted-middleware')

router.post('/',(req,res)=>{
    missingDB.addMissing(req.body)
    .then(missingPerson=>{
       if(missingPerson){
           return missingDB.getMissingById(missingPerson[0])
           .then(person=>res.status(201).json(person))
       }
    })
    .catch(err=>{
        console.log('line 11 missingRouter', err)
        res.status(500).json(err)
    })
})

router.delete('/:id', restricted, (req,res)=>{
    missingDB.deleteMissing(req.params.id)
    .then(count=>{
        if(count){
            return  missingDB.getMissing()
            .then(all=>{
                res.status(200).json(all)
            })
        }else{
            res.status(400).json({err:'That id does not exist'})
        }
        
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/', (req,res)=>{
    missingDB.getMissing()
    .then(all=>{
        res.status(200).json(all)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})
module.exports = router