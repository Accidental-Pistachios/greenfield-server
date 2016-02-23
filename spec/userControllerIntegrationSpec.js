var app = require('../server.js');
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');


var User = require('../models/userModel');
var userController = require('../controllers/userController');

var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('', function() {

  beforeEach(function(done) {
    clearDB(function () {
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
      User.create(users, done);
    });

  });

  describe('Account Creation:', function() {

    it('Signup creates a new user', function(done) {
      request(app)
        .post('/api/users/signup')
        .send({
          'email': 'Svnh@gmail.com',
          'firstName': 'Svnh',
          'lastName': 'Smith',
          'password': 'Svnh' })
        .expect(201)
        .end(function(err) {
          if (err) {
            console.error(err);
            done(err);
          } else {
            User.findOne({'email': 'Svnh@gmail.com'})
            .exec(function(err, user) {
              expect(user.email).to.equal('Svnh@gmail.com');
              expect(user.firstName).to.equal('Svnh');
              expect(user.lastName).to.equal('Smith');
              expect(user.password).to.exist;
              expect(user.events).to.exist;
              done();
            });
          }
        });
    });

    it('Signs in an existing user', function(done){
      request(app)
      .post('/api/users/signin')
      .send({
        'email' : 'j@smith.com',
        'password' : 'password'
      })
      .expect(202)
      .end(function(err, response){
        if(err){
          console.error(err);
          done(err);
        } else {
          expect(response.body.userId).to.be.a('string');
          done();
        }
      });
    });
  });

  describe('User event retrieval :', function(){
    var testUserId;

    
    it('gets a user\'s events', function(done){
      
      User.findOne({'firstName':'Magee'})
      .then(function(user){
        testUserId = user._id;
       
      request(app)
      .get('/api/users/'+testUserId+'/event')
      .expect(200)
      .end(function(err, response){
        if(err){
          console.error(err);
          done(err);
        } else {
          expect(response.body).to.be.a('array');
          done();
        }
      });
      });
    });
  });
});