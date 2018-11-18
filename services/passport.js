const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

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
            "https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=s180-rw",
          points: 250
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
