const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const log = require("./config/log");
const helmet = require('helmet');

const app = express();
app.use(helment());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


require("./models/User");
require("./services/passport");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", g => console.log("connection opened:", g));
mongoose.connect(
  keys.mongoUri,
  { useNewUrlParser: true }
);