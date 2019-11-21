const db = require('../dbConfig')

module.exports = {
    addMissing,
    deleteMissing,
    getMissing,
    getMissingById
}

function addMissing(obj){
    console.log(obj)
    return db('missing').insert(obj).select('*').returning('*')
    // .then(() => module.exports.getMissingById(obj.id))
}

function deleteMissing(id){
    console.log(id)
    return db('missing').where({id}).del()
}

function getMissing(){
    return db('missing').select('*').returning('*')
}

function getMissingById(id){
    return db('missing').where({id}).select('*')
}