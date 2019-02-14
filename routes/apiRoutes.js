const log = require("../config/log")("apiRoutes!~", "bgBlue");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/searchUsers/:query", (req, res) => {
    const { query } = req.params;
    const expression = `^[${query}].*$`;
    const regex = new RegExp(expression, "i");
    User.find({ usernameKey: regex })
      .limit(5)
      .then(d => {
        res.send(d.map(({ username, icon }) => ({ username, icon })));
      });
  });
};
