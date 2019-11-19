const router = require('express').Router()
const caseDB = require('./caseModel')
const connectDB = require('../connect/connectModel')
const restricted = require('../auth/restricted-middleware')

router.post('/:id', restricted, (req,res)=>{

    const [personObj , id]=[req.body, req.params.id]
    let sensitive = personObj.sensitive
    delete personObj['sensitive']
    let [person, connect] =[{},{}];
    const keys = Object.keys(personObj)
    
    keys.forEach(name=>{(name.includes('connect_'))?connect[name.split('_')[1]]=personObj[name]:person[name]=personObj[name]})
    const hasConnect = (Object.keys(connect).length>0)

    caseDB.add(id, person)
    .then(person=>{
        if(hasConnect){
            connectDB.addConnect({...connect, person_id: Number(person[0])})
            .then(success=>{
                console.log(success)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        return caseDB.addCase({user_id:Number(id), person_id: Number(person[0]), sensitive: sensitive})
        .then(_=>{
            return caseDB.getById(person)
                .then(createdPerson=>{
                    res.status(200).json(createdPerson)
                })
                .catch(err=>{
                    res.status(404).json({message:"something went wrong"})
                })
            })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })

    })
    .catch(err=>{
        res.status(500).json({error:"Something went wrong"})
    })
})

router.delete('/:id', restricted,(req,res)=>{
    const id = req.params.id 

    caseDB.remove(id)
    .then(count => {
    count?res.status(200).json({message:"success!"}):res.status(401).json({message:"that id does not exist, nothing was deleted"})
    })
    .catch(err=>{res.status(500).json({error: "something went wrong"})})
})




router.delete('/person/:id', restricted,(req,res)=>{
    const id = req.params.id 
    caseDB.removePerson(req.params.id)
    .then(count => {
    count?res.status(200).json({message:"success!"}):res.status(401).json({message:"that id does not exist, nothing was deleted"})
    })
    .catch(err=>{res.status(500).json({error: "something went wrong"})})
})

module.exports = router;
//create middleware to create person whenever a case is created.