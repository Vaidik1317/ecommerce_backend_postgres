const { db } = require("../models");
// const sequelize = require("../db-connection");
const cron = require("node-cron");

const sequelize = db.sequelize;
const dbMigrate = async () => {
  try {
    const { io } = require("../index");

    const migrateResults = [];
    console.log("🚀 ~ dbMigrate ~ migrateResults:", migrateResults);
    let successCount = 0;

    const models = Object.keys(db.sequelize.models);
    console.log("🚀 ~ dbMigrate ~ models:", models);

    io.emit("totaltable", { tableData: models.length });

    // Run migrations instead of sync
    const path = require('path');
    const { Sequelize } = require('sequelize');
    const Umzug = require('umzug');

    const umzug = new Umzug({
      migrations: {
        path: path.join(__dirname, '../migrations'),
        pattern: /^\d+[\w-]+\.js$/
      },
      storage: 'sequelize',
      storageOptions: {
        sequelize: sequelize,
      },
    });

    // Get pending migrations
    const pendingMigrations = await umzug.pending();
    console.log("🚀 ~ dbMigrate ~ pendingMigrations:", pendingMigrations);

    if (pendingMigrations.length > 0) {
      // Run migrations
      const migrationResults = await umzug.up();

      migrationResults.forEach((result) => {
        migrateResults.push({ migration: result.file, status: "success" });
        successCount++;
        io.emit("tableData", { count: successCount });
      });

      console.log("🚀 ~ dbMigrate ~ migrationResults:", migrationResults);
    } else {
      console.log("🚀 ~ dbMigrate ~ No pending migrations");
      migrateResults.push({ status: "no_migrations", message: "No pending migrations" });
    }

    const failedMigrations = migrateResults.filter(
      (result) => result.status === "failed"
    );

    if (failedMigrations.length > 0) {
      res
        .status(422)
        .send({ message: "Some migrations failed", results: migrateResults });
    } else {
      res.status(201).send("Successfully ran all migrations");
    }
  } catch (error) {
    console.log("🚀 ~ dbMigrate ~ error:", error);
    res.status(500).send({ message: "Migration failed", error: error.message });
  }
};

// cron.schedule("*/1****", dbMigrate);
// cron.schedule("*/50 * * * * *", () => {
//   dbMigrate();
//   console.log("running a migration task every 20 sec minutes");
//   console.log("🚀 ~ cron.schedule ~ dbMigrate:", dbMigrate);
// });

// console.log("🚀 ~ cron:migrate", cron);

module.exports.dbSyncController = { dbSync: dbMigrate };
