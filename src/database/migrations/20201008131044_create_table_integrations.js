exports.up = (knex) => {
  return knex.schema.createTableIfNotExists("integrations", (table) => {
    table.string("uuid", 255).unique().notNullable();

    table.string("origin", 255).notNullable();
    table.string("destination", 255).notNullable();

    table.string("experimentId", 255).notNullable();
    table.string("status", 255).notNullable().defaultTo("Running");

    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("finishedAt").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => knex.schema.dropTable("integrations");
