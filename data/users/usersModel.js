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

async function add(user) {
    const [id] = await db("users").insert(user);
  
    return findById(id);
}

function findById(id) {
return db("users")
    .where({ id })
    .first()
    .select("id", "username");
}