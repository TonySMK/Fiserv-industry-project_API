/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("menu_list", (table) => {
    table.increments("id").primary();
    table.string("name", 60).notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.string("description", 200);
    table.string("image", 2048);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("menu_items");
};
