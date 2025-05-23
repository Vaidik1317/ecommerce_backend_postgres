const { db } = require("../models");
// const sequelize = require("../db-connection");
const cron = require("node-cron");

const sequelize = db.sequelize;
const dbSync = async () => {
  try {
    const { io } = require("../index");

    const syncResults = [];
    console.log("🚀 ~ dbSync ~ syncResults:", syncResults);
    let successCount = 0;

    const models = Object.keys(db.sequelize.models);
    console.log("🚀 ~ dbSync ~ models:", models);

    io.emit("totaltable", { tableData: models.length });

    await db.sequelize.sync({ force: false, alter: true });

    const countTables = async () => {
      console.log("🚀 ~ countTables ~ countTables:", countTables);
      const [results] = await db.sequelize.query(`
          SELECT count(*)
          FROM information_schema.tables
          WHERE table_schema = 'public'
        `);

      return parseInt(results[0].count, 10);
    };

    const existingTableCount = await countTables();

    if (existingTableCount === 0) {
      await db.sequelize.sync({ force: false, alter: true });
    }

    for (const modelName of models) {
      try {
        const model = db.sequelize.models[modelName];
        await model.sync({ force: false, alter: true });
        syncResults.push({ model: modelName, status: "success" });
        successCount++;

        io.emit("tableData", { count: successCount });
      } catch (modelError) {
        syncResults.push({
          model: modelName,
          status: "failed",
          error: modelError.message,
        });
        console.log(`🚀 ~ Error syncing model ${modelName}:`, modelError);
        io.emit("modelName", { module_name: modelName });

        return modelName;
      }
      console.log("🚀 ~ dbSync ~ successCount:", successCount);
    }

    const failedSyncs = syncResults.filter(
      (result) => result.status === "failed"
    );

    if (failedSyncs.length > 0) {
      res
        .status(422)
        .send({ message: "Some models failed to sync", results: syncResults });
    } else {
      res.status(201).send("Successfully synced all models");
    }
  } catch (error) {
    console.log("🚀 ~ dbSync ~ error:", error);
  }
};

// cron.schedule("*/1****", dbSync);
// cron.schedule("*/50 * * * * *", () => {
//   dbSync();
//   console.log("running a  sync task every 20 sec minutes");
//   console.log("🚀 ~ cron.schedule ~ dbSync:", dbSync);
// });

// console.log("🚀 ~ cron:sync", cron);

module.exports.dbSyncController = { dbSync };
