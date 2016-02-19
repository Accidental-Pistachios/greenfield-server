var User = require('../models/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
// Promisify a few mongoose methods with the `q` promise library
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
// var addEvent = Q.nbind(Event.create, Event);
// var getAllEvents = Q.nbind(Event.find, Event);

module.exports = {
  
  getUserEvents : function(req, res, next){
    findUser({
      id : req.params.id
    })
    .then(function(user){
      res.json(user.events);
    })
    .fail(function(err){
      next(err);
    });
  },

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
            var userId = user._id
            res.json({token: token, userId: userId});
          } else {
            return next(new Error('No user'));
          }
        });
      }
    })
    .fail(function(err){
      next(err);
    });
  },

  //
  signUp : function(req, res, next){
    //check if user exists
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
          events : [],
          password : req.body.password
        });
      }
    })
    .then(function (user) {
      var token = jwt.encode(user, 'secret');
      var userId = user._id;
      res.json({ token : token, userId : userId
      });
    })
    .fail(function(err){
      next(new Error(err));
    });
  }
};
