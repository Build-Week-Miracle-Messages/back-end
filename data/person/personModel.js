const db = require('../dbConfig')

module.exports = {
    get
}

function get(id){
    //should show the list of people who's information is not private
    return db('person as p').join('cases as c', 'p.id', 'c.person_id').where({['c.sensitive']:false}).orWhere('p.id', '=', id).select('p.*')
}