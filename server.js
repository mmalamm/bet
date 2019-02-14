const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");
const cluster = require("cluster");
const net = require("net");

const farmhash = require("farmhash");

const helmet = require("helmet");
const passport = require("passport");

const keys = require("./config/keys");

const log = require("./config/log")("SERVER", "blue");

const session = require("./session");

const authenticate = require("./middlewares/authenticate");

const PORT = process.env.PORT || 5050;

const num_processes = require("os").cpus().length;

if (cluster.isMaster) {
  log("master cluster is at work!");
  const workers = [];

  const spawn = i => {
    workers[i] = cluster.fork();

    workers[i].on("exit", (code, signal) => {
      console.log("respawning worker", i);
      spawn(i);
    });
  };

  for (let i = 0; i < num_processes; i++) {
    spawn(i);
  }

  const worker_index = (ip, len) => {
    return farmhash.fingerprint32(ip) % len;
  };

  const server = net
    .createServer({ pauseOnConnect: true }, socket => {
      const worker = workers[worker_index(socket.remoteAddress, num_processes)];
      worker.send("sticky-session:connection", socket);
    })
    .listen(PORT);
} else {
  log("child process is at work!");
  const app = express();
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser(keys.cookieKey));

  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", authenticate);

  require("./models/User");
  require("./services/passport");

  require("./routes/apiRoutes")(app);
  require("./routes/authRoutes")(app);
  require("./routes/gameRoutes")(app);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "build")));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
  }

  const server = app.listen(0, "localhost");
  require("./services/socketio")(server);

  process.on("message", (message, connection) => {
    if (message !== "sticky-session:connection") return;

    server.emit("connection", connection);

    connection.resume();
  });
}
