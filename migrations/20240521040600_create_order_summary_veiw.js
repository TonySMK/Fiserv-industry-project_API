/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    `
    CREATE VIEW user_total_spent AS
    SELECT u.user_name, t.user_id, SUM(ml.price * t.quantity) AS total_spent
    FROM table_order t
    JOIN menu_list ml ON t.menu_item_id = ml.id
    JOIN user u ON t.user_id = u.id
    GROUP BY t.user_id
    `
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_total_spent");
};

/* CREATE VEIW table_summary_veiw AS
SELECT t.user_id AS table_order.user_id, SUM(ml.price) AS total_cost
FROM table_order t
JOIN menu_list ml ON t.menu_item.id = ml.id
GROUP BY t.user_id */
