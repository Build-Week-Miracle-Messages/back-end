
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
        {id: 1, name: 'Bill', age: 25, home_town:'los angeles', current_city:'san jose', contact:'1234567898'},
        {id: 2, name: 'Jose', age: 35, home_town:'dallas', current_city:'memphis', contact:'jose@gmail.com'},
        {id: 3, name: 'Helen', age: 45, home_town:'berkeley ', current_city:'portland', contact:'9876543212'}
      ]);
    });
};
