const express = require("express");
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");
const helmet = require("helmet");
const passport = require("passport");

const keys = require("./config/keys");

const log = require("./config/log")("SERVER", "blue");
const ioLog = require("./config/log")("socketIO", "yellow");

const session = require("./session");

const authenticate = require("./middlewares/authenticate");

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(keys.cookieKey));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authenticate);

require("./models/User");
require("./services/passport");

require("./routes/authRoutes")(app);

const server = app.listen(5050, () => log("server running on pt 5050"));

const io = require("socket.io").listen(server);

io.on("connection", socket => {
  ioLog("user connected to socket:", socket.id);
  io.emit("welcome", "hey");
  socket.on("playTurn", turn => ioLog(turn));
  socket.on("disconnecting", e => ioLog("dc from socket", e));
});
