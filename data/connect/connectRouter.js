const router = require('express').Router()
const connectDB = require('./connectModel')
const restricted = require('../auth/restricted-middleware')

router.post('/:id', restricted, (req,res)=>{
    const person_id = req.params.person_id
    const connect = req.body
    connectDB.addConnect({...connect, person_id})
    .then(conn=>{
        console.log(conn)
        res.status(200).json(conn)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err})
    })
})

router.get('/:id', restricted, (req,res)=>{
    const person_id = req.params.person_id
    connectDB.getConnectById(person_id)
    .then(connects=>{
        console.log(connects)
        res.status(200).json(connects)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err:err})
    })
})

router.put('/:id', restricted, (req,res)=>{
    const connectId = req.params.connectId
    connectDB.updateConnect(connect_id, req.body)
    .then(success=>{
        console.log(success)
        res.status(200).json(success)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({"err":err})
    })
})
