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
  userID: {
    type: String,
    required: 'Customer user id is missing',
    trim: true
  },
  fullName: {
    type: String,
    default: '',
    required: 'name is missing',
    trim: true
  },
  token: {
    type: String,
    required: 'token is missing',
    trim: true
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  siteID: {
    type: String,
    required: 'Site ID is missing',
    trim: true
  },
  noOfInverters: {
    type: Number,
    required: 'Number of inverters is missing',
    trim: true
  },
  orderStatus: {
    type: Number,
    required: 'Order status is missing',
    trim: true
  },
  installationDate:{
    type: Date,
    default: '',
    trim: true
  },
  oracleOrderId:{
    type: String,
    default: '',
    trim: true
  },  
  salesForceCaseId:{
    type: String,
    default: '',
    trim: true
  },
  installerId:{
    type: String,
    default: '',
    trim: true
  },
  payments:[{
    id: String,
    amount: Number
  }],
  notes: [{
    note : String,
    notedOn : Date
  }],
}, {
  timestamps: true
});

mongoose.model('Order', OrderSchema);