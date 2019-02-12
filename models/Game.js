const mongoose = require("mongoose");
const { Schema } = mongoose;
import User from "./User";
import Invite from "./Invite";
import Match from "./Match";

const gameSchema = new Schema({
  gameName: String,
  owner: User,
  gameStatus: String,
  inviteOnly: Boolean,
  invites: [Invite],
  players: [User],
  currentMatch: [Match]
});

const Game = mongoose.model("games", gameSchema);

module.exports = Game;
