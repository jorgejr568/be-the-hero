
exports.up = function(knex) {
  return knex.schema.createTable('incidents',table => {
      table.increments()

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value', 9, 2).notNullable();
      table.string('ong_id').notNullable();

      table.foreign('ong_id').references('id').inTable('ongs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('incidents');
};
