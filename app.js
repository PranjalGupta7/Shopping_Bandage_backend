const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const knex = require("./libraries/Postgres");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

app.use("/", routes);

// knex('users').select("*").then(console.log,console.log);

app.listen(3001, () => console.log("Port 3001 active."));
