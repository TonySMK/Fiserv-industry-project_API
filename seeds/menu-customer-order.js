// import seed data files, arrays of objects
const userSeedData = require("../seed-data/users");
const tableOrderSeedData = require("../seed-data/table_order");
const menuItemSeedData = require("../seed-data/menu_items");

exports.seed = async function (knex) {
  return knex("user")
    .del()
    .then(() => {
      return knex("menu_list").del();
    })
    .then(() => {
      return knex("table_order").del();
    })
    .then(() => {
      return knex("user").insert(userSeedData);
    })
    .then(() => {
      return knex("menu_list").insert(menuItemSeedData);
    })
    .then(() => {
      return knex("table_order").insert(tableOrderSeedData);
    });
};
