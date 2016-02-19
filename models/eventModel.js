// var db = require('./db/config.js');
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var Promise = require('bluebird');

var eventsSchema = mongoose.Schema({
  type: {
    type : String,
    required : true
  },
  location: {
    type : String,
    required : true
  },
  latitudue : {
    type : Number,
    required : true
  },
  longitude : {
    type : Number,
    required : true
  },
  startTime : {
    type : Date,
    required : true
  },
  endTime : {
    type : Date,
    required : true
  }, 
  playerCount : {
    type : Number,
    default : 1
  },
  skillLevel : {
    type : String,
    default : 'Hobby'
  }
});

var Event = mongoose.model('Event', eventsSchema);

exports.Event = Event;
exports.eventsSchema;
