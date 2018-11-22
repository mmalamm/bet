const mongoose = require("mongoose");
const keys = require("../config/keys");
const log = require("../config/log")("MONGOOSE");

const db = mongoose.connection;
db.on("error", e => log("connection error:", e));
db.on("open", g => log("connection opened:", g));

// launch connection
mongoose.connect(
  keys.mongoUri,
  { useNewUrlParser: true }
);

module.exports = db;
