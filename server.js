const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  imgUrl: String,
  points: Number
});

mongoose.model("users", userSchema);

const User = mongoose.model("users");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", g => console.log("connection opened:", g));
mongoose.connect(
  "mongodb://localhost:27017/bet",
  { useNewUrlParser: true }
);

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log("strategy hit!!!", username, password);
    User.findOne({ username }, function(err, user) {
      console.log("found user:::>", user);
      if (err) {
        return done(err);
      }
      if (!user) {
        new User({
          username,
          password,
          imgUrl:
            "https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=s180-rw"
        })
          .save()
          .then(user => done(null, user));
      } else if (user.password !== password) {
        console.log("wrong password for user", user);
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  })
);

passport.serializeUser((user, done) => {
  console.log("serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializing user:", id);
  User.findById(id).then(user => {
    done(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

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
  console.log(req);
  res.send(req.user);
});

app.listen(5050, () => console.log("server running on pt 5050"));
