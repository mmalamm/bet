const mongoose = require("mongoose");
const { Schema } = mongoose;

const inviteSchema = new Schema({
  usernameKey: String,
  status: String,
  game: { type: mongoose.Schema.Types.ObjectId, ref: "games" }
});

inviteSchema.index({ user: 1, game: 1 });

const Invite = mongoose.model("invites", inviteSchema);

module.exports = Invite;
