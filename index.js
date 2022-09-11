const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// import routers

// import controllers

// import DB
const db = require("./db/models/index");

// initialize controllers

// initialize routers

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
