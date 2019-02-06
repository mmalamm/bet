const bcrypt = require("bcrypt");
const saltRounds = 2;

const log = require("../config/log")("SEEDER", "bgYellow");
const db = require("../services/mongoose");
const User = require("../models/User");

const sampleUsers = [
  ["billY", "bob"],
  ["gW", "bush"],
  ["hEy", "world"],
  ["BU", "nelly"],
  ['alVin', 'chun'],
];

const icons = [
  "068587",
  "F2B134",
  "ED553B",
  "47AB6C",
  "cd1e1f",
  "911EB4",
  "000075",
  "4363D8",
  "E6194B",
  "28dfbb"
];

const promises = sampleUsers
  .map(u => {
    return { username: u[0], password: u[1] };
  })
  .map(async ({ username, password }) => {
    const hash = await bcrypt.hash(password, saltRounds);
    const randomIconIdx = Math.floor(Math.random() * icons.length);
    return new User({
      username,
      usernameKey: username.toLowerCase(),
      passwordHash: hash,
      icon: icons[randomIconIdx],
      points: 250
    }).save();
  });

log(promises);

db.dropDatabase().then(() => {
  Promise.all(promises).then(users => {
    log("following users seeded:", ...users.map(u => u.username));
    db.close();
  });
});
