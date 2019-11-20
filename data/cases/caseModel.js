const db = require('../dbConfig')

module.exports = {
    getEveryone,
    addCase,
    addConnect,
    add,
    remove,
    removePerson,
    getById,
    getByID,
    getUsersPerson,
    updatePerson,
    getPersonById,
    getConnectById
}

function addCase(obj){
    // should only be accessed through add case
    return db('cases').insert({...obj}).returning('id')
}

function addConnect(obj){
    //should only be accessed through add case 
    return  db('connect').insert(obj)
}

function add(personObj){
    return db('person').insert(personObj)//adds person
    
}

function getPersonById(id){
    return db('person').where({id}).first()
}

function getConnectById(id){
    console.log(id)
    return db('connect as c')
    .join('person as p', 'c.person_id', 'p.id')
    .where('c.person_id','=', id)
    .select('c.*')
}


function remove(id){
    return db('cases').where({id}).del()
}

function removePerson(id){
    return db('person').where({id}).del()
}

function getEveryone(id){
    //should show the list of people who's information is not private
    return db('person as p')
    .join('cases as c', 'p.id', 'c.person_id')
    .where({'c.sensitive':0})
    .orWhere('p.id', '=', id).select('p.*')//.orderBy('c.sensitive')
}

function getById(id, hasConnect){
    if (hasConnect){
    return db('person as p')
    .join('connect as c', 'p.id', 'c.person_id')
    .where({'p.id':id[0]})
    .select('p.*', 'c.name as connect_name', 'c.age as connect_age','c.relationship as connect_relationship', 'c.location as connect_location')
} else {
    return db('person as p').where({'id':id[0]}).select('*')
}
}


function getByID(id){
    return db('cases').where({id})// selects the first one
}

function getUsersPerson(id){
    //id is the users id
    return db('person as p')
    .join('cases as c', 'p.id', 'c.person_id')
    .join('users as u', 'u.id','c.user_id' )
    .where('u.id', '=', id)
    .select('p.*')
}

function updatePerson(id, body){
    console.log({id}, body)
    return db('person').update(body).where({id})
}