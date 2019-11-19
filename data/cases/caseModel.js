const db = require('../dbConfig')

module.exports = {
    get,
    addCase,
    addConnect,
    add,
    remove,
    removePerson,
    getById
}

// function get(){
//     return db('cases')
// }

function addCase(obj){
    // should only be accessed through add case
    return db('cases').insert({...obj}).returning('id')
}

function addConnect(obj){
    //should only be accessed through add case 
    return  db('connect').insert(obj)
}

function add(id, personObj){
    return db('person').insert(personObj)//adds person
   
}

function remove(id){
    return db('cases').where({id}).del()
}

function removePerson(id){
    return db('person').where({id}).del()
}

function get(id){
    //should show the list of people who's information is not private
    return db('person as p').join('cases as c', 'p.id', 'c.person_id').where({['c.sensitive']:false}).orWhere('p.id', '=', id).select('p.*')
}

function getById(id){
    return db('person').where({id:id[0]})
}