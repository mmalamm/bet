const socketIo = require("socket.io");
const passportSocketIo = require("passport.socketio");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const db = require("./mongoose");
const cookieParser = require("cookie-parser");
const ioLog = require("../config/log")("socketIO", "yellow");
const keys = require("../config/keys");
const get = require("lodash/get");

const log = require("../config/log")("debug", "bgWhite");

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
    const connectedSocketIds = Object.keys(io.sockets.sockets);
    const connectedUsernames = () =>
      connectedSocketIds
        .map(id => get(io, `sockets.sockets[${id}].request.user.username`))
        .filter(u => u);
    log(connectedUsernames());
    const userSockets = passportSocketIo.filterSocketsByUser(
      io,
      user => user.username === socket.request.user.username
    );
    if (userSockets.length > 1) {
      log("more than 1 instance logged in:", userSockets.length);
      userSockets
        .filter(s => s.id !== socket.id)
        .forEach(skt => {
          log(skt.request.cookie, skt.request.user.username);
          skt.request.cookie["connect.sid"] = null;
          skt.disconnect();
        });
    }
    ioLog("user connected to socket:", socket.request.user);
    io.emit("welcome", "hey");
    io.emit("currentUsers", connectedUsernames());
    socket.on("playTurn", turn => {
      ioLog(turn);
      socket.emit("updateStatus", `thanks ${socket.request.user.username}`);
    });
    socket.on("disconnecting", e => {
      ioLog("dc from socket", socket.request.user.username);
    });
    socket.on("disconnect", () => {
      io.emit("currentUsers", connectedUsernames());
    });
  });
};
