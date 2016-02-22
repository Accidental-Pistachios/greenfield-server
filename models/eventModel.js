var mongoose = require('mongoose');

var eventsSchema = new mongoose.Schema({
  type: {
    type : String,
    required : true
  },
  location: {
    type : String,
    required : true
  },
  latitude : {
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

module.exports = mongoose.model('event', eventsSchema);
