// this is for allowing relative path links in react
// proxies from localhost:3000 (react dev server) to localhost:5000 (app server)
// to make auth process possible between dev/prod
// without this, the oAuth callback URL will have a mismatch error in development

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/local", { target: "http://localhost:5050" }));
  app.use(proxy("/auth/github", { target: "http://localhost:5050" }));
  app.use(proxy("/api/*", { target: "http://localhost:5050" }));
};
