const passport = require("passport");
const newUserHandler = require("./newUserHandler");
const log = require("../config/log")("authRoutes!~");

module.exports = app => {
  app.post("auth/register", newUserHandler);

  app.post(
    "/auth/local",
    passport.authenticate("local", { failureRedirect: "/failed" }),
    (req, res) => {
      res.cookie("username", req.user.username);
      res.send(req.user);
    }
  );
  app.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie("username");
    res.send(req.user);
  });

  app.get("/failed", (req, res) => {
    log(req.flash);
    res.send(req.body);
  });

  app.get("/current_user", (req, res) => {
    log(req.body);
    log(req.cookies);
    log(req.session);
    res.send(req.user);
  });

  app.get("/getsession", (req, res, next) => {
    log("session", req.session);
    res.send("my fav color: " + req.session.favColor);
  });
};
