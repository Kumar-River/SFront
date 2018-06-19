'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Order = mongoose.model('Order'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  async = require('async'),
  stripe = require("stripe")("sk_test_OGHUomNfEgmXrbZJd8FduVWP"); //Development

/**
 * Create a Order
 */
exports.create = async function(req, res) {
  var order = new Order(req.body);
  order.user = req.user;

  console.log('order ' + JSON.stringify(order));

  const customer = await createCustomer(order);
  console.log('customer ' + JSON.stringify(customer));
  if (!customer) {
    return res.status(400).send({
      message: 'Unable to create the customer in stripe'
    });
  }

  /*const charge = await chargeTheCustomer(customer, 1000);
  console.log('charge1 ' + JSON.stringify(charge));
  if (!charge) {
    return res.status(400).send({
      message: 'Unable to charge the customer'
    });
  }*/


  //Save the order
  order.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(order);
    }
  });

};



/**
 * Create a Customer
 */
async function createCustomer(order) {

  const customer = await stripe.customers.create({
    source: order.token,
    email: order.email
  });

  return customer;
}

/**
 * Charge the Customer instead of the card:
 */
async function chargeTheCustomer(customer, amount) {

  const charge = await stripe.charges.create({
    amount: amount,
    currency: 'usd',
    customer: customer.id,
  });

  return charge;
}




/**
 * Show the current Order
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var order = req.order ? req.order.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  order.isCurrentUserOwner = req.user && order.user && order.user._id.toString() === req.user._id.toString();

  res.jsonp(order);
};

/**
 * Update a Order
 */
exports.update = function(req, res) {
  var order = req.order;

  order = _.extend(order, req.body);

  order.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(order);
    }
  });
};

/**
 * Delete an Order
 */
exports.delete = function(req, res) {
  var order = req.order;

  order.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(order);
    }
  });
};

/**
 * List of Orders
 */
exports.list = function(req, res) {
  Order.find().sort('-created').populate('user', 'displayName').exec(function(err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(orders);
    }
  });
};

/**
 * Order middleware
 */
exports.orderByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Order is invalid'
    });
  }

  Order.findById(id).populate('user', 'displayName').exec(function(err, order) {
    if (err) {
      return next(err);
    } else if (!order) {
      return res.status(404).send({
        message: 'No Order with that identifier has been found'
      });
    }
    req.order = order;
    next();
  });
};