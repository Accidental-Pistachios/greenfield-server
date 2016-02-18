var db = require('/config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var eventsSchema = mongoose.Schema({
  type: String,
  location: String,
  startTime : String,
  endTime : String, 
  playerCount : Number,
  skillLevel : String
});

var Event = mongoose.model('Event', eventsSchema);

exports.Event = Event;
exports.eventsSchema;
