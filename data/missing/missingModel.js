const db = require('../dbConfig')

module.exports = {
    addMissing,
    deleteMissing,
    getMissing,
    getMissingById
}

function addMissing(obj){
    return db('missing').insert(obj).select('*')
    // .then(() => module.exports.getMissingById(obj.id))
}

function deleteMissing(){
    return db('missing').where({id}).del()
}

function getMissing(){
    return db('missing').select('*')
}

function getMissingById(id){
    return db('missing').where({id}).select('*')
}