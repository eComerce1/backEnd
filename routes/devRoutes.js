const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

router.post("/run-setup", (req, res) => {
  exec("npm run tables && npm run seeders", (error, stdout, stderr) => {
    if (error) {
      console.error("Error ejecutando scripts:", error);
      return res.status(500).json({ error: error.message });
    }
    console.log("Scripts ejecutados con éxito");
    res.status(200).json({ message: "Base de datos lista", output: stdout });
  });
});

module.exports = router;
