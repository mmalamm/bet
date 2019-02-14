const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  usernameKey: String,
  passwordHash: String,
  icon: String,
  points: Number,
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "games" }],
  invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "invites" }],
});
userSchema.index({ usernameKey: 1 }, { unique: true });
const User = mongoose.model("users", userSchema);

module.exports = User;
