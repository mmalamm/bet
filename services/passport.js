const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
// const saltRounds = 2;
const log = require("../config/log")("PASSPORT", "magenta");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  log("serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  log("deserializing user:", id);
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    log("Passport local strategy activated:", username, password);
    User.findOne({ username }, async function(err, user) {
      log("found user:::>", user);
      if (err) {
        return done(err);
      }
      if (!user) {
        log("no user found", user);
        return done(null, false, { message: "Incorrect Username" });
      } else {
        const pwMatch = await bcrypt.compare(password, user.passwordHash);
        if (!pwMatch) {
          log("wrong password for user", user);
          return done(null, false, { message: "Incorrect Password" });
        }
      }
      return done(null, user);
    });
  })
);
