var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

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

usersSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
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

module.exports = mongoose.model('users', usersSchema);