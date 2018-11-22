const passport = require("passport");
const newUserHandler = require("./newUserHandler");

module.exports = app => {
  app.get("/login", (req, res) =>
    res.send(`
      <form action="/login" method="post">
        <div>
          <label>Username:</label> <input type="text" name="username" /><br />
        </div>
        <div>
          <label>Password:</label> <input type="password" name="password" />
        </div>
        <div><input type="submit" value="Submit" /></div>
      </form>
    `)
  );

  app.post("/register", newUserHandler);

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/failed" }),
    (req, res) => {
      // console.log(req.body);
      // res.send(req.user);
      res.cookie("username", username);
      res.send(req.user);
    }
  );
  app.get("/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/failed", (req, res) => {
    console.log(req.flash);
    res.send(req.body);
  });

  app.get("/current_user", (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    res.send(req.user);
  });

  app.get("/getsession", (req, res, next) => {
    res.send("my fav color: " + req.session.favColor);
  });
};
