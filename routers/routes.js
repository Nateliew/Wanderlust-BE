// const express = require("express");

// require("dotenv").config();

// // const ToolsController = require("./controllers/ToolsController");

// const router = express.Router();

// // import controllers
// const TripsController = require("../controllers/tripsController");
// const PackItemsController = require("../controllers/packItemsController");
// const UsersController = require("../controllers/usersController");

// // const apiV1 = require("./controllers/ApiRoute1");
// // const apiV2 = require("./controllers/ApiRoute2");

// // import DB
// const db = require("../db/models/index");

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

// // import routers
// const TripsRouter = require("./tripsRouter");
// const PackItemsRouter = require("./packItemsRouter");
// const UsersRouter = require("./usersRouter");

// // initialize routers
// const tripsRouter = new TripsRouter(tripsController).routes();
// const packItemsRouter = new PackItemsRouter(packItemsController).routes();
// const usersRouter = new UsersRouter(usersController).routes();

// // const usersRouter = new UsersRouter(usersController);
// // const usersRouterRoutes = () => {
// //   const UsersController = require("../controllers/usersController");
// //   const usersController = new UsersController(user);
// //   const UsersRouter = require("./usersRouter");
// //   const usersRouter = new UsersRouter(usersController);
// //   return usersRouter.routes();
// // };

// const checkJwt = auth({
//   audience: process.env.AUDIENCE,
//   issuerBaseURL: process.env.ISSUER_BASE_URL,
// });

// router.use("/trips", auth(), tripsRouter);
// router.use("/items-catalog", packItemsRouter);
// router.use("/users", usersRouter);

// router.get("/test-get", ToolsController.show);
// router.post("/test-post", store);
// router.delete("/test-delete/:id", ToolsController.delete);

// function store(req, res) {
//   const tools = {};
//   return res.status(201).send({});
// }

module.exports = function (auth, express) {
  require("dotenv").config();

  // const ToolsController = require("./controllers/ToolsController");

  const router = express.Router();

  // import controllers
  const TripsController = require("../controllers/tripsController");
  const PackItemsController = require("../controllers/packItemsController");
  const UsersController = require("../controllers/usersController");

  // const apiV1 = require("./controllers/ApiRoute1");
  // const apiV2 = require("./controllers/ApiRoute2");

  // import DB
  const db = require("../db/models/index");

  const {
    user,
    trip,
    user_trip,
    item,
    trip_item,
    comment,
    wishlist,
    calendar,
  } = db;

  // initialize controllers
  const tripsController = new TripsController(
    trip,
    user,
    user_trip,
    item,
    trip_item,
    comment,
    wishlist,
    calendar
  );
  const packItemsController = new PackItemsController(item);
  const usersController = new UsersController(user);

  // import routers
  const TripsRouter = require("./tripsRouter");
  const PackItemsRouter = require("./packItemsRouter");
  const UsersRouter = require("./usersRouter");

  // initialize routers
  const tripsRouter = new TripsRouter(tripsController).routes();
  const packItemsRouter = new PackItemsRouter(packItemsController).routes();
  const usersRouter = new UsersRouter(usersController).routes();

  // const usersRouter = new UsersRouter(usersController);
  // const usersRouterRoutes = () => {
  //   const UsersController = require("../controllers/usersController");
  //   const usersController = new UsersController(user);
  //   const UsersRouter = require("./usersRouter");
  //   const usersRouter = new UsersRouter(usersController);
  //   return usersRouter.routes();
  // };

  // const checkJwt = auth({
  //   audience: process.env.AUDIENCE,
  //   issuerBaseURL: process.env.ISSUER_BASE_URL,
  // });

  router.use("/trips", tripsRouter);
  router.use("/items-catalog", packItemsRouter);
  router.use("/users", usersRouter);

  return router;
};
