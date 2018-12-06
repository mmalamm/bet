const passport = require("passport");
const newUserHandler = require("./newUserHandler");

module.exports = app => {
  ///
  app.get("/login", (req, res) =>
    res.send(`
      <form action="/login" method="post">
        <h1>Login</h1>
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
  app.get("/register", (req, res) =>
    res.send(`
      <form action="/register" method="post">
        <h1>Register</h1>
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
  ///

  app.post("/register", newUserHandler);

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/failed" }),
    (req, res) => {
      // console.log(req.body);
      // res.send(req.user);
      res.cookie("username", req.user.username);
      res.send(req.user);
    }
  );
  app.post(
    "/auth/local",
    passport.authenticate("local", { failureRedirect: "/failed" }),
    (req, res) => {
      // console.log(req.body);
      // res.send(req.user);
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
    console.log(req.flash);
    res.send(req.body);
  });

  app.get("/current_user", (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.session);
    res.send(req.user);
  });

  app.get("/getsession", (req, res, next) => {
    console.log("session", req.session);
    res.send("my fav color: " + req.session.favColor);
  });
};
