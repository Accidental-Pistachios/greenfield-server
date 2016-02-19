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
    var name = req.body.name;
    var password = req.body.password;
    findUser({
      name : name
    })
    .then(function(user){
      if(!user){
        next(new Error('User does not exist!'));
      } else {
        //TODO create user.compare 
        return User.comparePasswords(password)
          .then(function(foundUser){
            if(foundUser){
              //conjuring 
              var token = jwt.encode(user, 'secret');
              res.json({token : token});
            } else {
              return next(new Error('Password not correct'));
            }
          });
      }
    })
    .fail(function(err){
      next(err);
    });
  },

  signUp : function(req, res, next){
    //check if user exists
    findUser({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exists!'));
        } else {
          return createUser({
            name : req.body.name,
            email : req.body.email,
            events : [],
            password : req.body.password
          });
        }
      })
      .then(function(user){
        var token = jwt.encode(user, 'secret');
        res.json({token : token});
      })
      .fail(function(err){
        next(new Error('Incorrect password'));
      });
  }
};




