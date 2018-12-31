const mongoose = require("mongoose");
const User = mongoose.model("users");
const log = require("../config/log")("newUserHandler~!", "bgGreen");

const bcrypt = require("bcrypt");
const saltRounds = 2;

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

  if (password.length < 3) {
    log("Password is way too short");
    return res.redirect("/home?r=passwordTooShort&c=register");
  }

  const existingUserWithUsername = await User.findOne({ username });

  if (existingUserWithUsername) {
    log(
      "Tried to register new user; would overwrite:",
      existingUserWithUsername
    );
    return res.redirect("/home?r=usernameTaken&c=register");
  }

  new User({
    username,
    passwordHash: hash,
    imgUrl:
      "https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=s180-rw",
    points: 250
  })
    .save()
    .then(user => {
      log("NEW USER REGISTERED:", user);
      res.redirect(307, "/auth/local");
    });
};
