const express = require("express");
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");
const helmet = require("helmet");
const passport = require("passport");
const keys = require("./config/keys");
const log = require("./config/log")("SERVER");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(keys.cookieKey));

app.use(passport.initialize());
app.use(passport.session());

require("./models/User");
require("./services/passport");
require("./services/mongoose");

require("./routes/authRoutes")(app);

app.listen(5050, () => log("server running on pt 5050"));
