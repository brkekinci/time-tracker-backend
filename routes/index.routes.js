module.exports = (app) => {
  require("./user.routes")(app);
  require("./auth.routes")(app);
};
