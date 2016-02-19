// var db = require('../db/config.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
// var events = require('./events.js');

var usersSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  email: {
    type : String,
    required : true,
    unique : true
  },
  events: [], //will hold ID's
  password: {
    type : String,
    required : true
  }
});

var users = mongoose.model('users', usersSchema);

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});


usersSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return Q.Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

module.exports = users;
// UserSchema.pre('save', function (next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) {
//     return next();
//   }

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) {
//       return next(err);
//     }

//     // hash the password along with our new salt
//     bcrypt.hash(user.password, null, null, function (err, hash) {
//       if (err) {
//         return next(err);
//       }

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       user.salt = salt;
//       next();
//     });
//   });
// });