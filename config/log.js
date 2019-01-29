const chalk = require("chalk");

if (process.env.NODE_ENV === "production") {
  module.exports = (w, clr = "blue") => (...args) => {
    const str = chalk[clr](`${Date.now()} ${w}`);
    console.log(str, ...args);
  };
} else {
  module.exports = (w, clr = "blue") => (...args) => {
    const now = Date.now();
    console.log(chalk[clr](`[${new Date(now)}] ${w}:`));
    console.log(...args);
    const lineBreaker = `<-----------${now}----------->`;
    console.log(`${chalk[clr](lineBreaker)}`);
  };
}
