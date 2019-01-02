const bcrypt = require("bcrypt");
const saltRounds = 2;

const log = require("../config/log")("SEEDER", "bgYellow");
const db = require("../services/mongoose");
const User = require("../models/User");

const sampleUsers = [
  ["billy", "bob"],
  ["gw", "bush"],
  ["hey", "world"],
  ["bu", "nelly"]
];

const icons = [
  "apple",
  "bananas",
  "carrot",
  "chili-pepper",
  "chocolate",
  "coffee-cup",
  "corn",
  "croissant",
  "donut",
  "eggplant",
  "french-fries",
  "hamburger",
  "ice-cream",
  "milkshake",
  "pizza",
  "popsicle",
  "strawberry",
  "taco",
  "watermelon",
  "cherry"
];

const promises = sampleUsers
  .map(u => {
    return { username: u[0], password: u[1] };
  })
  .map(async ({ username, password }) => {
    const hash = await bcrypt.hash(password, saltRounds);
    const randomIconIdx = Math.floor(Math.random() * icons.length)
    return new User({
      username,
      passwordHash: hash,
      icon: icons[randomIconIdx],
      points: 250
    }).save();
  });

log(promises);

User.deleteMany({}).then(() => {
  Promise.all(promises).then(users => {
    log("following users seeded:", users.map(u => u.username));
    db.close();
  });
});
