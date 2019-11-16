
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cases').del()
    .then(function () {
      // Inserts seed entries
      return knex('cases').insert([
        {id: 1, user_id: 1, person_id:1, sensitive: false},
        {id: 2, user_id: 2, person_id:2, sensitive: true},
        {id: 3, user_id: 3, person_id:3, sensitive: false}
      ]);
    });
};
