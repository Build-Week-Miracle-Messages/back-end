const db = require('../dbConfig')

module.exports = {
    get,
    addCase,
    addConnect,
    add,
    remove,
    removePerson
}

// function get(){
//     return db('cases')
// }

function addCase(obj){
    // should only be accessed through add case
    // console.log('case',obj)
    console.log(obj)
    return db('cases').insert({...obj, id:4})
}

function addConnect(obj){
    //should only be accessed through add case 
    // console.log('connect',obj)
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

function get(){
    //should show the list of people who's information is not private
    return db('person as p').join('cases as c', 'p.id', 'c.person_id').where({['c.sensitive']:false}).select('p.*')
}
