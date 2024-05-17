const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
  console.log("order: ", knex("order"))
  knex('order')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Orders: ${err}`)
    );
};

const findOne = (req, res) => {
  knex('order')
    .where({ order_id: req.params.id })
    .then((orderItemFound) => {

      if (orderItemFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Order item with ID: ${req.params.id} not found` });
      }

      res.status(200).json(orderItemFound[0]);
    })
    .catch(() => {
      
      res.status(500).json({
        message: `Unable to retrieve order data for order item with ID: ${req.params.id}`,
      });
    });
}

const add = (req, res) => {
  if ((req.body.order_quantity <= 0) || !req.body.menu_item_id || !req.body.ordering_party) {
    return res
      .status(400)
      .send("Please check that menu item and ordering party exist and quantity is greater than zero");
  }

  knex("order")
    .insert(req.body)
    .then((result) => {
      return knex("order")
        .where({ order_id: result[0] })
    })
    .then((createdOrder) => {
      res.status(201).json(createdOrder);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to create new order" });
    })
};

const update = (req, res) => {
  knex("order")
    .where({ order_id: req.params.id })
    .update(req.body)
    .then(() => {
      return knex("order").where({
        order_id: req.params.id,
      });
    })
    .then((updatedOrder) => {
      res.json(updatedOrder[0]);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: `Unable to update order item with ID: ${req.params.id}` });
    });
};

const remove =  (req, res) => {
  knex("order")
    .where({ order_id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Order with ID: ${req.params.id} to be deleted not found.`,
        });
      }

      // no content response
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete order item" });
    });
};

module.exports = {
  index,
  findOne,
  add,
  update,
  remove
}
