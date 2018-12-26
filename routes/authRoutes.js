const passport = require("passport");
const newUserHandler = require("./newUserHandler");
const log = require("../config/log")("authRoutes!~", "bgRed");

module.exports = app => {
  app.post("/auth/register", newUserHandler);

  app.post(
    "/auth/local",
    passport.authenticate("local", { failureRedirect: "/login?r=authFailure" }),
    (req, res) => {
      log("Loggin in user:", req.user);
      res.cookie("username", req.user.username);
      res.redirect("/");
    }
  );

  app.get("/auth/logout", (req, res) => {
    log("Logging out user:", req.user);
    req.logout();
    res.clearCookie("username");
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      return res.send(req.user.username);
    }
    res.send(null);
  });

  app.post("/api/logout", (req, res) => {
    log("Logging out user via API:", req.user);
    req.logout();
    res.clearCookie("username");
    res.send("logged out");
  });
};
