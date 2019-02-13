const socketIo = require("socket.io");
const passportSocketIo = require("passport.socketio");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const db = require("./mongoose");
const cookieParser = require("cookie-parser");
const ioLog = require("../config/log")("socketIO", "yellow");
const keys = require("../config/keys");
const get = require("lodash/get");
const mongoAdapter = require("socket.io-adapter-mongo");

// const Game = require("../models/Game");

module.exports = server => {
  const io = socketIo(server);
  io.adapter(mongoAdapter(keys.mongoUri));

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

  io.on("connection", async socket => {
    // const invites = await invites.find({  });

    // socket.emit("invites", invites);
    // socket.emit("games", games);

    socket.emit("welcome", socket.request.user);
    io.emit('userConnected', `${socket.id} ${socket.request.user.username} joined`)
    socket.on("disconnecting", e => {
      ioLog(socket.id + " dc from socket:", socket.request.user.username);
    });
    socket.on("disconnect", () => {
      log(`${socket.id} disconnected`);
      io.emit('userDisconnected', `${socket.id} disconnected`);
    });
  });
};
