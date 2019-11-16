
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('connect').del()
    .then(function () {
      // Inserts seed entries
      return knex('connect').insert([
        {id: 1, person_id: 1, name:'Charles', age:23, relationship:'brother', location:'san francisco'},
        {id: 2, person_id: 2, name:'Ernie', relationship:'friend'},
        {id: 3, person_id: 3, name:'James', age:67, relationship:'father', location:'mexico'}
      ]);
    });
};
