var users = require('./../controllers/userController.js');
var events = require('./../controllers/eventController.js');
var helpers = require('./helpers.js');

module.exports = function(app, express) {
  // authentication middleware used to decode token and made available on the request
  app.use('/api/users/:id/event', helpers.decode);
  app.use('/api/events', helpers.decode);

  //users routes
  //get requests
  app.get('/api/users/:id/event', users.getUserEvents);

  //post requests
  app.post('/api/users/signup', users.signUp);
  app.post('/api/users/signin', users.signIn);

  //events routes
  //get requests
  app.get('/api/events', events.getEvents);
  app.get('/api/events/:id', events.getEvent);
  
  //post requests
  app.post('/api/events', events.addEvent);
  app.post('/api/events/users/:id', events.checkInUser);
  app.delete('/api/events/users/:id', events.removeUserEvent);
};
