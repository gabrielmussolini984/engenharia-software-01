const express = require("express");
const cors = require("cors");
const app = express();
const { app: routes } = require("./Usuario/Usuario.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

module.exports = app;
