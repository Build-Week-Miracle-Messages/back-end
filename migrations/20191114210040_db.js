
exports.up = function(knex) {
  return knex.schema
  .createTable('a_table', tbl=>{
      tbl.increments()
      tbl.string()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('a_table')
};
