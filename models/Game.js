const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
  gameName: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  gameStatus: String,
  inviteOnly: Boolean,
  invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "invites" }],
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  // currentMatch: [{ type: mongoose.Schema.Types.ObjectId, ref: "matches" }]
});

const Game = mongoose.model("games", gameSchema);

module.exports = Game;
