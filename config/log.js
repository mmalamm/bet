const chalk = require("chalk");

module.exports = w => (...args) => {
  const now = Date.now();
  console.log(chalk.blue(`[${new Date(now)}] ${w}:`));
  console.log(...args);
  const lineBreaker = `<-----------${now}----------->`;
  console.log(`${chalk.blue(lineBreaker)}`);
};
