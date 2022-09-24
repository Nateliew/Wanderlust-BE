const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// import routers
// const TripsRouter = require("./routers/tripsRouter");
// const PackItemsRouter = require("./routers/packItemsRouter");
// const UsersRouter = require("./routers/usersRouter");

// import controllers
// const TripsController = require("./controllers/tripsController");
// const PackItemsController = require("./controllers/packItemsController");
// const UsersController = require("./controllers/usersController");

// import DB
// const db = require("./db/models/index");

// const { user, trip, user_trip, item, trip_item, comment, wishlist, calendar } =
//   db;

// // initialize controllers
// const tripsController = new TripsController(
//   trip,
//   user,
//   user_trip,
//   item,
//   trip_item,
//   comment,
//   wishlist,
//   calendar
// );
// const packItemsController = new PackItemsController(item);
// const usersController = new UsersController(user);

// initialize routers
// const tripsRouter = new TripsRouter(tripsController).routes();
// const packItemsRouter = new PackItemsRouter(packItemsController).routes();
// const usersRouter = new UsersRouter(usersController).routes();

const PORT = process.env.PORT;
const app = express();
const router = require("./routers/routes")(auth, express);

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// app.use("/trips", tripsRouter);
// app.use("/items-catalog", packItemsRouter);
// app.use("/users", usersRouter);
// app.use(auth());
app.use(router);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
