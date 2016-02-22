var Event = require('../models/eventModel.js');
var User = require('../models/userModel.js');
var Q = require('q');

var updateEvent = Q.nbind(Event.update, Event);
var findEvent = Q.nbind(Event.findOne, Event);
var createEvent = Q.nbind(Event.create, Event);
var findAllEvents = Q.nbind(Event.find, Event);
var findUser = Q.nbind(User.findOne, User);
var updateUser = Q.nbind(User.update, User);

module.exports = {

  addEvent: function(req, res, next){
    //TODO check if an event already exists in time and place
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
    .then(function (newEvent){
      res.status(201).json(newEvent);
    })
    .fail(function(err){
     next(err);
    });
  },

  getEvents: function (req, res, next) {
    findAllEvents()
    .then(function (events) {
      res.status(200).json(events);
    })
    .fail(function (error) {
      next(error);
    });
  },

  checkInUser: function (req, res, next) {
    //TODO need to add logic to prevent user from checking in multiple times
    var userId = req.params.id;
    var eventId = req.body.eventId;
    var userCondition = { _id : userId };
    var userUpdate = { $push : { events : eventId } };
    
    updateUser(userCondition, userUpdate)
    .then(function(){
      var eventCondition = { _id : eventId };
      console.log(eventCondition);
      var eventUpdate = { $inc : { playerCount : 1 } };

      return updateEvent(eventCondition, eventUpdate);
    })
    .then(function(){
      res.sendStatus(202);
    })
    .fail(function(err){
      console.error(new Error('Could not update event'));
    });
  },

  removeUserEvent: function (req, res, next) {
    var userId = req.params.id;
    var eventId = req.body.eventId;
    findUser({_id: userId})
    .then(function (user) {
      for(var i = 0; i< user.events.length; i ++) {
        if(user.events[i] === eventId) {
          user.events.splice(i, 1);
          user.save();
          return updateEvent({ _id : eventId }, { $inc : { playerCount : -1 } })
        }
      }
    })
    .then(function () {
      return findEvent({ _id : eventId })
    })
    .then(function (foundEvent) {
      if (foundEvent.playerCount === 0){
        foundEvent.remove();
      }
      res.status(202);
    })
    .fail(function (error) {
      next(error);
    });
  }
};