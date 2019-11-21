const db = require('../dbConfig')

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find(){
    return db("users").select("id", "username", "email", "name", "password");
}

function findBy(filter){
    return db('users').where(filter)
}

function add(user) {
    // console.log('does it wait?')
    // const [id] = await db("users").insert(user);
    // console.log(id)
    // return findById(id);
    return db("users").insert(user).returning('id')
}

function findById(id) {
    console.log('is this called')
return db("users")
    .where({ id })
    .first()
    .select("id", "username");
}