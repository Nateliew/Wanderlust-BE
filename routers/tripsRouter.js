const express = require("express");
const router = express.Router();

class TripsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // EDITED: CRUD routes for overarching trip retrieval for a particular user, added params
    router.get("/:userId", this.controller.getAllTrips.bind(this.controller));
    //add trip POST
    // delete trip DELETE

    router.get(
      "/:userId/:tripId",
      this.controller.getOneTrip.bind(this.controller)
    );
    // edit trip : PUT

    //CRUD for packing list
    router.get(
      "/:userId/:tripId/packing-list",
      this.controller.getAllPackItems.bind(this.controller)
    );

    router.post(
      "/:userId/:tripId/packing-list",
      this.controller.addPackItem.bind(this.controller)
    );
    router.put(
      "/:userId/:tripId/packing-list",
      this.controller.editPackItem.bind(this.controller)
    );
    router.delete(
      "/:userId/:tripId/packing-list",
      this.controller.removePackItem.bind(this.controller)
    );

    //CRUD for wishlist
    router.get(
      "/:userId/:tripId/wishlist",
      this.controller.getAllWishlistItems.bind(this.controller)
    );

    //CRUD for calendar
    router.get(
      "/:userId/:tripId/calendar",
      this.controller.getAllCalendarItems.bind(this.controller)
    );

    //CRUD for comments
    router.get(
      "/:userId/:tripId/comments",
      this.controller.getAllComments.bind(this.controller)
    );

    return router;
  }
}

function getRouter() {
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
  const TripsController = require("../controllers/tripsController");
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
  const tripsRouter = new TripsRouter(tripsController).routes();
  return tripsRouter;
}

module.exports = getRouter;
module.exports = TripsRouter;
