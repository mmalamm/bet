const log = require("../config/log")("newUserHandler~!", "bgBlue");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Game = mongoose.model("games");
const Invite = mongoose.model("invites");

const { keyify } = require("../utils/helpers");

const newGameHandler = async (req, res, next) => {
  const {
    body: { invites, inviteOnly, gameName },
    user: { username }
  } = req;

  /*
  once game is sent:
  1) create the game
    a) name, status, inviteOnly
    b) query for and attach user
    c) attach owner as sole player
    d) create game, get id
    e) create&attach invites
  2) send out the invites
  3) attach game to player(s)
  */
  const user = await User.findOne({ usernameKey: keyify(username) });

  const game = await new Game({
    gameName,
    owner: user._id,
    gameStatus: "NEW_GAME",
    inviteOnly,
    invites: [],
    players: [user._id]
  }).save();

  user.games.push(game._id);

  const invitePromises = invites.map(async invite => {
    const usernameKey = keyify(invite.username);
    const inv = await new Invite({
      usernameKey,
      status: "PENDING",
      game: game._id
    }).save();
    game.invites.push(inv._id);
    return inv;
  });

  await Promise.all(invitePromises).then(async invitations => {
    await game.save();
    await user.save();
    await Promise.all(
      invitations.map(invitation => {
        return User.findOneAndUpdate(
          { usernameKey: invitation.usernameKey },
          {
            $push: {
              invites: invitation._id
            }
          }
        );
      })
    );
  });
  log("game created:", game);
  res.send(await game.populate());
};

module.exports = app => {
  app.post("/api/game/new", newGameHandler);
};
