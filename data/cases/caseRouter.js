const router = require('express').Router()
const caseDB = require('./caseModel')
const connectDB = require('../connect/connectModel')
const restricted = require('../auth/restricted-middleware')



router.get('/all', restricted, (req,res)=>{

    caseDB.getEveryone(req.decodedJwt.sub)
    .then(everyone=>{
        res.status(200).json(everyone)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/current', restricted, (req,res)=>{
    caseDB.getUsersPerson(req.decodedJwt.sub)
    .then(people=>{
        // console.log(people)
        res.status(200).json(people)
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
})

router.get('/:id', restricted, (req,res)=>{
    const id = req.params.id
    caseDB.getPersonById(id)
    .then(person=>{
        return caseDB.getConnectById(person.id)
        .then(connect=>{
            console.log('these are connects', connect)
            res.status(200).json({...person, connect:[...connect]})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)

        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})


router.post('/', restricted, (req,res)=>{

    const [personObj , id]=[req.body, req.decodedJwt.sub]
    let sensitive = personObj.sensitive
    delete personObj['sensitive']
    let [person, connect] =[{},{}];
    const keys = Object.keys(personObj)
    
    keys.forEach(name=>{(name.includes('connect_'))?connect[name.split('_')[1]]=personObj[name]:person[name]=personObj[name]})
    const hasConnect = (Object.keys(connect).length>0)

    caseDB.add(person)
    .then(newPerson=>{
        if(hasConnect){
            console.log('this is a person', person, 'this is a new person', newPerson)
            connectDB.addConnect({...connect, person_id: Number(newPerson[0].id)})
            .then(success=>{
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        console.log('line 76',{user_id:Number(id), person_id: Number(newPerson[0].id), sensitive: sensitive})
        return caseDB.addCase({user_id:Number(id), person_id: Number(newPerson[0].id), sensitive: sensitive})
        .then(_=>{
            console.log(_)
            caseDB.getPersonById('newPerson',newPerson[0].id)
            .then(currentPerson=>{
                console.log('currentPerson line 83', currentPerson)
                return caseDB.getConnectById(newPerson[0].id)
                .then(connect=>{
                    console.log('these are connects', connect)
                    res.status(200).json({...newPerson, connect:[...connect]})
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json(err)
                })
            .catch(err=>{
                console.log(err)
                res.status(400).json({err, message:'@ line 93 case was not added?'})
            })
            })
            })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:"A case could not be added due to foreign key constraint"})
        })

    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Something went wrong"})
    })
})

router.delete('/:id', restricted, validateUserCase,(req,res)=>{
    //where id is for case
    const user_id = (req.decodedJwt.sub)
    const id = req.params.id
    caseDB.getCaseByID(id)
        .then(thisCase=>{
        caseDB.removePerson(thisCase[0].person_id)
            .then(count => {
                return caseDB.getUsersPerson(user_id)
                .then(cases=>{
                    (cases.length>0)?res.status(200).json(cases):res.status(400).json({error:"you have no cases"})
                })
                .catch(err=>{
                    res.status(404).json(err)
                })
            
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({error: "something went wrong"})})
            })
    })


router.delete('/person/:id', restricted, validateUserCase,(req,res)=>{
    const id = req.params.id 
    caseDB.removePerson(req.params.id)
    .then(count => {
    count?res.status(200).json({message:"success!"}):res.status(401).json({message:"that id does not exist, nothing was deleted"})
    })
    .catch(err=>{res.status(500).json({error: "something went wrong"})})
})

router.put('/person/:id', restricted, validateUserCase,(req,res)=>{
    const person_id = req.params.id
    caseDB.updatePerson(person_id, req.body)
    .then(updated=>{
        if(updated){
           return caseDB.getById(person_id)
            .then(updatedPerson=>{
                res.status(201).json(updatedPerson)
            })
            .catch(err=>{
                console.log('caseRouter 120 ',err)
                res.status(400).json(err)
            })
        }else{
            res.status(400).json({message:"no one was updated"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})


function  validateUserCase(req,res,next){
    caseDB.getCaseByID(req.params.id)
    .then(thisCase=>{
        (thisCase.length===0)?res.status(404).json({error:"this case does not exist"}):(thisCase[0].user_id === req.decodedJwt.sub)? next():res.status(400).json({error:"This is not your case!"})
    })
}

module.exports = router;
//create middleware to create person whenever a case is created.

