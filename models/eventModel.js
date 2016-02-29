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
  expireAt: {
      type: Date,
      required: true
  },
  skillLevel : {
    type : String,
    default : 'Hobby'
  }
});

eventsSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });
module.exports = mongoose.model('events', eventsSchema);