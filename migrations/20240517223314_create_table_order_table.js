/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("table_order", (table) => {
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("user.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("menu_item_id")
      .notNullable()
      .unsigned()
      .references("menu_list.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("quantity").unsigned();
    table.string("modifcations", 60);
    table.boolean("paid").notNullable();
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
  return knex.schema.dropTable("table_order");
};
