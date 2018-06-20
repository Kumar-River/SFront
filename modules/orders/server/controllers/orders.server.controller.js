'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Order = mongoose.model('Order'),
  Counter = mongoose.model('Counter'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  async = require('async'),
  stripe = require("stripe")("sk_test_OGHUomNfEgmXrbZJd8FduVWP"); //Development

/**
 * Create a Order
 */
exports.create = async function(req, res) {
  var order = new Order(req.body);

  var orderIdCounter = await getOrderIdCounter();
  if (!orderIdCounter) {
    return res.status(500).send({
      message: 'Unable to create order Id'
    });
  }
  order.orderId = orderIdCounter.seq;

  const customer = await createCustomerInStripe(order);
  if (!customer) {
    return res.status(500).send({
      message: 'Unable to create the customer in stripe'
    });
  }
  order.stripeCustomer = customer;

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
 * Create Order Id
 */
async function getOrderIdCounter() {
  const counterNameKey = 'orderid';
  //If order id is already there then increment by 1.
  var counter = await Counter.findOneAndUpdate({
    counterName: counterNameKey
  }, {
    $inc: {
      seq: 1
    }
  });

  if (counter == null) {
    const startingOrderId = 1;

    var counterObj = new Counter({
          counterName: counterNameKey,
          seq: startingOrderId + 1 //save with default value plus 1 for next order Id.
        });

    counter = await counterObj.save();//create order id with default value.
    counter.seq = startingOrderId;
  }
  return counter;
}


/**
 * Create a Customer in Stripe
 */
async function createCustomerInStripe(order) {

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