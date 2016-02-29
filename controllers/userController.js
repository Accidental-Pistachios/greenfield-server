var User = require('../models/userModel.js');
var Event = require('../models/eventModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var findAllEvents = Q.nbind(Event.find, Event);

module.exports = {
  
  /*
    Input
      id (userId) String
    Output
      events Array
      response status 200
  */
  getUserEvents : function(req, res, next){
    
    
    findUser({
      _id : req.body.userId
    })
    .then(function(user){

      findAllEvents().
      then(function(events){

        var validIds = events.map(function(foundEvent){
          return foundEvent._id.toString();
        });

        for(var i  = 0; i < user.events.length; i++){

          if(validIds.indexOf( user.events[i].toString() ) < 0){
            user.events.splice(i, 1);
            user.save();
          }
        }
        
        res.status(200).json(user.events);
      });
    })
    .fail(function(err){
      next(err);
    });
  },

  /*
    Input
      email String
      password String
    Output
      token String
      userId String
      response status 202
  */
  signIn : function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    findUser({ email : email })
    .then(function (user) {
      if (!user) {
        next(new Error('User does not exist!'));
      } else {
        return user.comparePasswords(password)
        .then(function (foundUser) {
          if (foundUser) {
            var token = jwt.encode(user, 'secret');
            var userId = user._id;
            res.status(202).json({token: token, userId: userId});
          } else {
            return next(new Error('Wrong password!'));
          }
        });
      }
    })
    .fail(function(err){
      next(err);
    });
  },

  /*
    Input
      email String
      password String
    Output
      token String
      userId String
      response status 201
  */
  signUp : function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    findUser({ email: email })
    .then(function (user) {
      if (user) {
        next(new Error('User already exists!'));
      } else {
        return createUser({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password : req.body.password
        });
      }
    })
    .then(function (user) {
      var token = jwt.encode(user, 'secret');
      var userId = user._id;
      res.status(201).json({ token : token, userId : userId });
    })
    .fail(function(err){
      next(new Error(err));
    });
  }
};
