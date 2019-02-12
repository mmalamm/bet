const mongoose = require("mongoose");
const { Schema } = mongoose;
import User from "./User";
import Game from "./Game";

const inviteSchema = new Schema({
  user: User,
  status: String,
  game: Game
});

inviteSchema.index({ user: 1 });

const Invite = mongoose.model("invites", inviteSchema);

module.exports = Invite;
