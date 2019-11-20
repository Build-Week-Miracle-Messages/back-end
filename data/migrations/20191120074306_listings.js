
exports.up = function(knex) {
  return knex.schema
  .createTable('missing', tbl=>{
      tbl.increments()
      tbl.string('name').notNullable()
      tbl.integer('age').notNullable()
      tbl.string('home_town', 255).notNullable()
      tbl.string('contact', 126).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('missing')
};
