'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Order name',
    trim: true
  },
  token: {
    type: String,
    required: 'Please fill Order token',
  },
}, {
  timestamps: true
});

mongoose.model('Order', OrderSchema);