var users = require('./../controllers/user.js');
var events = require('./../controllers/event.js');

module.exports = function(app) {
  //users routes
  //get requests
  app.get('/api/users/:id/event', users.getEvents);

  //post requests
  app.post('/api/users/signup', users.signUp);
  app.post('/api/users/signin', users.signIn);

  //events routes
  //get requests
  app.get('/api/events', events.getEvents);

  //post requests
  app.post('/api/events', events.addEvent);
  app.post('/api/events/users/:id', events.checkInUser);
  app.delete('/api/events/users/:id', events.removeUserEvent);
}