var jwt = require('jwt-simple');

module.exports = {
  decode: function (req, res, next) {
    var token = req.headers['x-access-token'];
    var user;
    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, 'secret');
      req.body.userId = user._id;
      next();
    } catch (error) {
      return next(error);
    }
  }
};