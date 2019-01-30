const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");

const helmet = require("helmet");
const passport = require("passport");

const keys = require("./config/keys");

const log = require("./config/log")("SERVER", "blue");

const session = require("./session");

const authenticate = require("./middlewares/authenticate");

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

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => {
  log("server running on port", PORT);
});

require("./services/socketio")(server);
