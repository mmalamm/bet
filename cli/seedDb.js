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

const promises = sampleUsers
  .map(u => {
    return { username: u[0], password: u[1] };
  })
  .map(async ({ username, password }) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return new User({
      username,
      passwordHash: hash,
      imgUrl:
        "https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=s180-rw",
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
