const passport = require("passport");
const newUserHandler = require("./newUserHandler");
const log = require("../config/log")("authRoutes!~", "bgRed");

module.exports = app => {
  app.post("/auth/register", newUserHandler);

  app.post(
    "/auth/local",
    passport.authenticate("local", { failureRedirect: "/login?r=authFailure" }),
    (req, res) => {
      res.cookie("username", req.user.username);
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.clearCookie("username");
    res.redirect("/");
  });

  app.get("/failed", (req, res) => {
    log(req.flash);
    res.send(req.body);
  });

  app.get("/api/current_user", (req, res) => {
    log("req.user is:", req.user);
    if (req.user) {
      return res.send(req.user.username);
    }
    res.send(null);
  });

  app.get("/getsession", (req, res, next) => {
    log("session", req.session);
    res.send("my fav color: " + req.session.favColor);
  });
};
