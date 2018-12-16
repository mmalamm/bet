const chalk = require("chalk");

module.exports = (w, clr = "blue") => (...args) => {
  const now = Date.now();
  console.log(chalk[clr](`[${new Date(now)}] ${w}:`));
  console.log(...args);
  const lineBreaker = `<-----------${now}----------->`;
  console.log(`${chalk[clr](lineBreaker)}`);
};
