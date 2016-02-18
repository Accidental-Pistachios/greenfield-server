var db = require('/config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var usersSchema = mongoose.Schema({
  name: String,
  email: String,
  events: [],
  password: String
});

var User = mongoose.model('User', usersSchema);

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});


module.exports = User;