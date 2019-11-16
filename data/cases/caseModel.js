const db = require('../dbConfig')

function get(){
    return db('cases')
}

function addCase(obj){
    // should only be accessed through add case
    db('cases').insert({obj})
}

function addConnect(obj){
    //should only be accessed through add case 
    db('connect').insert({obj})
}

function add(id, person, connect){
    // creates person, connect, case
    let sensitive = person.sensitive
    delete person['sensitive']
    let casePerson = db('person').insert({person}).select('*') //adds person
    addCase({...person, user_id: id, sensitive: sensitive})
    addConnect(connect)
    // db('cases').insert({...person, user_id: id, sensitive: sensitive}) // adds case
    return casePerson
}

function remove(id){
    return db('cases').where({id}).del()
}

function get(){
    //should show the list of people who's information is not private
    return db('people as p').join('cases as c', 'p.id', 'c.person_id').where({[c.sensitive]:false}).select('p.*')
}
