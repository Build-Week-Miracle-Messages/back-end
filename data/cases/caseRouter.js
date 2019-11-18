const router = require('express').Router()
const caseDB = require('./caseModel')
const restricted = require('../auth/restricted-middleware')

router.post('/:id', restricted, (req,res)=>{
    const personObj= req.body
    const id = req.params.id
    let sensitive = personObj.sensitive
    delete personObj['sensitive']
    let [person, connect] =[{},{}];
    const keys = Object.keys(personObj)
    keys.forEach(name=>{(name.includes('connect_'))?connect[name.split('_')[1]]=personObj[name]:person[name]=personObj[name]})
    
    caseDB.add(id, person)
    .then(person=>{
        caseDB.addCase({user_id:Number(id), person_id: Number(person[0]), sensitive: sensitive})
        caseDB.addConnect({...connect, person_id: Number(person[0])})
        caseDB.getById(person)
        .then(createdPerson=>{
            res.status(200).json(createdPerson)
        })
        .catch(err=>{
            res.status(404).json({message:"something went wrong"})
        })
        // caseDB.get

    })
    .catch(err=>{
        res.status(500).json({error:"Something went wrong"})
    })
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id 

    caseDB.remove(req.params.id)
    .then(count => {
    count?res.status(200).json({message:"success!"}):res.status(401).json({message:"that id does not exist, nothing was deleted"})
    })
    .catch(err=>{res.status(500).json({error: "something went wrong"})})
})

router.delete('/person/:id',(req,res)=>{
    const id = req.params.id 
    caseDB.removePerson(req.params.id)
    .then(count => {
    count?res.status(200).json({message:"success!"}):res.status(401).json({message:"that id does not exist, nothing was deleted"})
    })
    .catch(err=>{res.status(500).json({error: "something went wrong"})})
})

module.exports = router;
//create middleware to create person whenever a case is created.