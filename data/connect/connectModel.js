const db = require('../dbConfig')

module.exports = {
    getConnect,
    addConnect,
    updateConnect
}

function getConnect(id){
    return db('connect').where({person_id:id})
}

function addConnect(obj){
    return  db('connect').insert(obj)
}

function updateConnect(id, body){
    return db('connect').update({body}).where(id) // id is the id of the connect
}