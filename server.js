require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.APP_PORT;
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${port}.`);
  console.log(`[Express] Ingresar a http://localhost:${port}.\n`);
});
