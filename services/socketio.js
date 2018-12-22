const socketIo = require("socket.io");
const passportSocketIo = require("passport.socketio");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const db = require("./mongoose");
const cookieParser = require("cookie-parser");
const ioLog = require("../config/log")("socketIO", "yellow");
const keys = require("../config/keys");

module.exports = server => {
  const io = socketIo(server);

  io.use(
    passportSocketIo.authorize({
      cookieParser,
      key: "connect.sid",
      secret: keys.cookieKey,
      store: new MongoStore({
        mongooseConnection: db
      })
    })
  );

  io.on("connection", socket => {
    ioLog("user connected to socket:", socket.request.user);
    io.emit("welcome", "hey");
    socket.on("playTurn", turn => ioLog(turn));
    socket.on("disconnecting", e => {
      socket.request.logout();
    });
  });
};
