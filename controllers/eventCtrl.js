var Event = require('../models/eventModel.js');
var User = require('../models/userModels.js');
var Q = require('q');

var findEvent = Q.nbind(Event.findOne, Event);
var createEvent = Q.nbind(Event.create, Event);
var findAllEvents = Q.nbind(Event.find, Event);
var findUser = Q.nbind(User.findOne, User);

module.exports = {

  addEvent: function(req, res, next){
    createEvent({
      type : req.body.type,
      location : req.body.location,
      latitude : req.body.latitude,
      longitude : req.body.longitude,
      startTime : req.body.startTime,
      endTime : req.body.endTime,
      playerCount : req.body.playerCount,
      skillLevel : req.body.skillLevel
    })
    .then(function(){
      res.writeHead(200);
      res.end();
    })
    .fail(function(err){
     next(err);
    });
  },
  
  // api/events req.method = GET
  // return all events
  allEvents: function (req, res, next) {
  findAllEvents({})
    .then(function (events) {
      res.json(events);
    })
    .fail(function (error) {
      next(error);
    });
  },

  checkInUser: function (req, res, next) {
  var userId = req.params.id;
  findUser({id: userId})
    .then(function (user)){
      //add event to events array
      user.events.push(req.body.event);
    })
    .fail(function (error) {
      next(error);
    });
  },

  removeUserEvent: function (req, res, next) {
  var userId = req.params.id;
  findUser({id: userId})
    .then(function (user)){
      //remove the event from array, syntax below:
      //db.inventory.remove( { type : "food" } )
      user.events.remove({})
    })
    .fail(function (error) {
      next(error);
    }); 


  }
}

