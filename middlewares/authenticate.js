const log = require("../config/log")("AUTHENTICATING...", "red");

const authenticate = (req, res, next) => {
  if (req.user) {
    log("LOGGED IN:", req.user.username);
  } else {
    log("NOT LOGGED IN!");
  }
  next();
};

module.exports = authenticate;
