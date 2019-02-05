const passport = require("passport");
const newUserHandler = require("./newUserHandler");
const log = require("../config/log")("authRoutes!~", "bgRed");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.post("/auth/register", newUserHandler);

  app.post(
    "/auth/local",
    passport.authenticate("local", { failureRedirect: "/?r=authFailure" }),
    (req, res) => {
      log("Loggin in user:", req.user);
      res.redirect("/?l=loggedIn");
    }
  );

  app.get("/auth/logout", (req, res) => {
    log("Logging out user:", req.user);
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      const { icon, username, points } = req.user;
      const output = {
        icon,
        username,
        points
      };
      return res.send({ user: output });
    }
    res.send({ user: null });
  });

  app.post("/api/update_icon", (req, res) => {
    const {
      user: { username },
      body: { iconName: icon }
    } = req;
    User.findOneAndUpdate({ username }, { $set: { icon } }).then(d => {
      log("update icon path hit", d.username);
      res.send(`Icon Updated to ${icon}`);
    });
  });

  app.post("/api/logout", (req, res) => {
    if (req.user) {
      log("Logging out user via API:", req.user.username);
      req.logout();
      res.send("logged out");
    } else {
      res
        .status(400)
        .send("No user is logged in, so there is nothing to logout");
    }
  });
};
