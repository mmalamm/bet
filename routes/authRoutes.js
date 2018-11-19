const passport = require("passport");

module.exports = app => {
  app.get("/login", (req, res) =>
    res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>bet</title>
  </head>
  <body>
    <form action="/login" method="post">
      <div>
        <label>Username:</label> <input type="text" name="username" /><br />
      </div>
      <div>
        <label>Password:</label> <input type="password" name="password" />
      </div>
      <div><input type="submit" value="Submit" /></div>
    </form>
  </body>
</html>
`)
  );

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/failed" }),
    (req, res) => {
      console.log(req.body);
      res.send(req.user);
    }
  );
  app.get("/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/current_user", (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    res.send(req.user);
  });
};
