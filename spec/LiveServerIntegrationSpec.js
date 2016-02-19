var app = require('../server.js');
var should = require("should");
var server = require('supertest')(app);
// var server = supertest.agent("http://localhost:3000");

describe("addEvent",function(){

  it("should add an event",function(done){
    var newEvent = {
      type : 'basketball',
      location: '944 Market St San Franciso, CA',
      latitude: 37.783697,
      longitude: -122.408966,
      startTime: new Date('01.02.2012'),
      endTime: new Date('01.03.2012'),
      playerCount: 1,
      skillLevel: 'Hobby'
    };
    
    server
    .post("/api/events")
    .send(newEvent)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      res.body.data.should.equal(newEvent);
      done();
    });
  });

});
