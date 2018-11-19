const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  passwordHash: String,
  imgUrl: String,
  points: Number
});

const User = mongoose.model("users", userSchema);

module.exports = User;
