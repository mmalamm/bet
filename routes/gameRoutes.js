const newGameHandler = async (req, res, next) => {
  const { invites, inviteOnly, gameName } = req.body;
  const { username, icon } = req.user;
  const owner = { username, icon };

  res.send({ gameName, owner, gameStatus: "NEW_GAME", inviteOnly, invites });
};

module.exports = app => {
  app.post("/api/game/new", newGameHandler);
};
