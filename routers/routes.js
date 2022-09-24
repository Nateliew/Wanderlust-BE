module.exports = function (auth, express) {
  require("dotenv").config();

  // const ToolsController = require("./controllers/ToolsController");

  const router = express.Router();

  // import controllers
  const TripsController = require("../controllers/tripsController");
  const PackItemsController = require("../controllers/packItemsController");
  const UsersController = require("../controllers/usersController");

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

  const checkJwt = auth({
    audience: "https://travel/api",
    issuerBaseURL: "https://dev-owrmeqco.us.auth0.com/",
  });

  router.use("/trips", checkJwt, tripsRouter);
  router.use("/items-catalog", checkJwt, packItemsRouter);
  router.use("/users", checkJwt, usersRouter);

  return router;
};
