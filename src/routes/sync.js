const { dbSyncController: ic } = require("../sync");

module.exports = (app, router) => {
  router.get("/dbSync", ic.dbSync);

  app.use("/", router);
};
