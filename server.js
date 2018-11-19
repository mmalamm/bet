const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const log = require("./config/log")("SERVER");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

require("./models/User");
require("./services/passport");

const db = mongoose.connection;
db.on("error", e => log("connection error:", e));
db.on("open", g => log("connection opened:", g));
mongoose.connect(
  keys.mongoUri,
  { useNewUrlParser: true }
);

require("./routes/authRoutes")(app);

app.listen(5050, () => log("server running on pt 5050"));
