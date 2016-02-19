var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = require('./db/config');

var port = 3000;

require('./utils/middleware.js')(app, express);
require('./utils/router.js')(app, express);

app.listen(port); 

console.log('Magic happens on port ' + port);

exports = module.exports = app;