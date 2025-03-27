/*
 * Este archivo se encarga de importar todos los seeders que se hayan definido
 * en el sistema y ejectuarlos.
 *
 * Para ejecutar este archivo se debe correr el comando:
 *
 * 👉 node seeders/runAllSeeders.js
 *
 *
 * Como alternativa, en el artchivo package.json se creó un comando "alias"
 * para que la ejecución sea un poco más corta:
 *
 * 👉 npm run seeders
 */

require("dotenv").config();
const { sequelize } = require("../models");

async function runAllSeeders() {
  try {
    await sequelize.authenticate();
    console.log("[Database] Conexión establecida con éxito.");

    await sequelize.sync();
    console.log("[Database] Tablas sincronizadas.");

    await require("./productSeeder")();
    console.log("[Database] ¡Los datos de prueba fueron insertados!");

    process.exit();
  } catch (error) {
    console.error("❌ Error al ejecutar los seeders:", error);
    process.exit(1);
    r;
  }
}

runAllSeeders();
