const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const keys = require("../config/keys");
const db = require("../services/mongoose");

if (process.env.NODE_ENV === "production") {
  module.exports = session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  });
} else {
  module.exports = session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
      mongooseConnection: db,
    })
  });
}
