const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

// import routers
const TripsRouter = require("./routers/tripsRouter");
const PackItemsRouter = require("./routers/packItemsRouter");

// import controllers
const TripsController = require("./controllers/tripsController");
const PackItemsController = require("./controllers/packItemsController");

// import DB
const db = require("./db/models/index");

const { user, trip, packinglist, packingitem, user_trip, shared_packinglist } =
  db;

// initialize controllers
const tripsController = new TripsController(
  trip,
  user,
  packinglist,
  packingitem
);
const packItemsController = new PackItemsController(packingitem);

// initialize routers
const tripsRouter = new TripsRouter(tripsController).routes();
const packItemsRouter = new PackItemsRouter(packItemsController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

app.use("/trips", tripsRouter);
app.use("/packing-items", packItemsRouter);
//app.user(/users, usersRouter)

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
