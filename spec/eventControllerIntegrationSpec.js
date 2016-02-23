var app = require('../server.js');
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');

var Event = require('../models/eventModel');
var eventController = require('../controllers/eventController');


var User = require('../models/userModel');
var userController = require('../controllers/userController');


var clearDB = function (done) {
  mongoose.connection.collections['events'].remove(function(){
    mongoose.connection.collections['users'].remove(done);
  });
};


var testUserId;
var testEventId;

describe('Event Integration Tests', function() {

  beforeEach(function(done) {
    clearDB(function () {
      var events = [
        {
          type: 'soccer',
          location: '19th & Dolores St, San Francisco, CA 94114',
          latitude: 37.759819,
          longitude: -122.426036,
          startTime: new Date('December 17, 2020 03:24:00'),
          endTime: new Date('December 17, 2020 05:24:00'),
          skillLevel: 'Professional'
        },
        {
          type: 'basketball',
          location: '19th & Dolores St, San Francisco, CA 94114',
          latitude: 37.759819,
          longitude: -122.426036,
          startTime: new Date('December 17, 2020 03:24:00'),
          endTime: new Date('December 17, 2020 05:24:00'),
          skillLevel: 'Hobby'
        }
      ];

      
 
      var users = [
        {
          firstName: 'Magee',
          lastName: 'May',
          email: 'magee@magee.com',
          password: '12345678'
        },
        {
          firstName: 'John',
          lastName: 'Smith',
          email: 'j@smith.com',
          password: 'password'
        },
        {
          firstName: 'Jack',
          lastName: 'Black',
          email: 'j@b.com',
          password: 'rockon'
        }
      ];

      Event.create(events, function(){
        User.create(users, done);
      });
    });
  });

  describe('Event Creation:', function() {
    it('Add Event method creates a new event', function(done) {
      //event created by user 'John' for testing purpose
      var testUserId;
      User.findOne({'firstName':'John'})
      .then(function(user){
        testUserId = user._id;
        request(app)
        .post('/api/events')
        .send({
          type: 'tennis',
          location: '19th & Dolores St, San Francisco, CA 94114',
          latitude: 37.759819,
          longitude: -122.426036,
          startTime: new Date('December 17, 2020 03:24:00'),
          endTime: new Date('December 17, 2020 05:24:00'),
          skillLevel: 'Hobby',
          userId: testUserId
        })
        .expect(202)
        .end(function(err) {
          if (err) {
            console.error(err);
            done(err);
          } else {
            Event.findOne({'type': 'tennis'})
            .exec(function(err, newEvent) {
              expect(newEvent.type).to.equal('tennis');
              expect(newEvent.location).to.equal('19th & Dolores St, San Francisco, CA 94114');
              expect(newEvent.latitude).to.equal(37.759819);
              expect(newEvent.longitude).to.equal(-122.426036);
              expect(newEvent.startTime).to.exist;
              expect(newEvent.startTime).to.exist;
              expect(newEvent.skillLevel).to.equal('Hobby');
              expect(newEvent.playerCount).to.equal(1);
              done();
            });
          }
        });
      })
    });

    it('Get event method gets all events', function(done) {
      request(app)
      .get('/api/events')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.error(err);
          done(err);
        } else {
          var resBody = res.body;
          for (var i = 0; i < res.body.length; i++) {
            var testEvent = res.body[i];

            testEvent.hasOwnProperty('type');
            testEvent.hasOwnProperty('location');
            testEvent.hasOwnProperty('latitude');
            testEvent.hasOwnProperty('longitude');
            testEvent.hasOwnProperty('startTime');
            testEvent.hasOwnProperty('endTime');
            testEvent.hasOwnProperty('playerCount');
            testEvent.hasOwnProperty('skillLevel');
          }
          done();
        }
      });
    });

    xit('Should remove an user from event', function(done) {
      
//      request(app)
//      .delete('/api/events/users/'+)
    });

    it('should check in a user', function(done){
      var testEventId;

      Event.findOne({type : 'soccer'})
      .then(function(thisEvent){
        testEventId = thisEvent._id;

        User.findOne({'firstName':'Magee'})
        .then(function(user){
          testUserId = user._id;
   
          request(app)
          .post('/api/events/users/'+testUserId+'/')
          .send({
            eventId : testEventId
          })
          .expect(202)
          .end(function(err, response){
            if(err){
              console.error(err);
              done(err);
            } else {
              User.findOne({'firstName' : 'Magee'})
              .then(function(user){
                expect(user.events[0]).to.equal(testEventId.toString());
                done();
              });
            }
          });
        });
      });
    });
  });
});