
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl=>{
      tbl.increments()
      tbl.string('name', 126).notNullable()
      tbl.string('username', 126).notNullable().unique()
      tbl.string('email', 126).notNullable().unique()
      tbl.string('password', 126).notNullable()
  })
  .createTable('person', tbl=>{
      tbl.increments()
      tbl.string('name', 126).notNullable()
      tbl.integer('age').notNullable()
      tbl.string('home_town', 255).notNullable()
      tbl.string('current_city', 255).notNullable()
      tbl.string('contact', 126).notNullable()
      
  })
  .createTable('cases', tbl=>{
      tbl.increments()
      tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      tbl.integer('person_id')
      .references('id')
      .inTable('person')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .unsigned()
      .notNullable()
      tbl.boolean('sensitive').notNullable().default(false)
  })
  .createTable('connect', tbl=>{
      tbl.increments()
      tbl.integer('person_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('person')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      tbl.string('name', 126).notNullable()
      tbl.integer('age')
      tbl.string('relationship', 126).notNullable()
      tbl.string('location', 126)
  })

};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('connect')
  .dropTableIfExists('cases')
  .dropTableIfExists('person')
  .dropTableIfExists('users')
};
