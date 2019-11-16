
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'uzias', username:'uziasr', email:'uzias@gmail.com', password: '1234'},
        {id: 2, name: 'chris', username:'chrisb', email:'chris@gmail.com', password: '1234'},
        {id: 3, name: 'mashima', username:'mashimab', email:'mashima@gmail.com', password: '1234'}
      ]);
    });
};
