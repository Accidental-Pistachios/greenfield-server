var users = require('./../controllers/userController.js');
var events = require('./../controllers/eventController.js');

module.exports = function(app, express) {
  //users routes
  //get requests
  app.get('/api/users/:id/event', users.getUserEvents);

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