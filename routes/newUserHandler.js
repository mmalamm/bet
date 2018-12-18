const mongoose = require("mongoose");
const User = mongoose.model("users");
const log = require("../config/log")("newUserHandler~!", "bgGreen");

const bcrypt = require("bcrypt");
const saltRounds = 2;

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

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
