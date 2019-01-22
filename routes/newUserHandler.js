const mongoose = require("mongoose");
const User = mongoose.model("users");
const log = require("../config/log")("newUserHandler~!", "bgGreen");

const bcrypt = require("bcrypt");
const saltRounds = 2;

const { keyify } = require("../utils/helpers");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  if (password.length < 3) {
    log("Password too short");
    return res.redirect("/?r=passwordTooShort&c=register");
  }

  const hash = await bcrypt.hash(password, saltRounds);

  if (username.length > 14 || username.match(/\W/g)) {
    log("Username invalid");
    return res.redirect("/?r=invalidUsername&c=register");
  }

  const existingUserWithUsername = await User.findOne({
    usernameKey: keyify(username)
  });

  if (existingUserWithUsername) {
    log(
      "Tried to register new user; would overwrite:",
      existingUserWithUsername
    );
    return res.redirect("/?r=usernameTaken&c=register");
  }

  new User({
    username,
    usernameKey: keyify(username),
    passwordHash: hash,
    icon: "apple",
    points: 250
  })
    .save()
    .then(user => {
      log("NEW USER REGISTERED:", user);
      res.redirect(307, "/auth/local");
    });
};
