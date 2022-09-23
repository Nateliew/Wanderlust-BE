const express = require("express");
const router = express.Router();

class TripsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }

  routes() {
    // /:TRIPID/USERS/:USERID

    // EDITED: CRUD routes for overarching trip retrieval for a particular user, added params
    router.get(
      "/users/:userId",
      this.controller.getAllTrips.bind(this.controller)
    );
    //add trip POST
    router.post("/", this.controller.insertOneTrip.bind(this.controller));
    // delete trip DELETE
    router.delete("/:tripId", this.controller.deleteTrip.bind(this.controller));

    // GET ALL INFO FROM ONE SINGLE TRIP : info like users
    router.get("/:tripId", this.controller.getOneTrip.bind(this.controller));
    // edit trip : PUT

    //CRUD for packing list
    router.get(
      "/:tripId/packing-list/users/:userId",
      this.controller.getAllPackItems.bind(this.controller)
    );

    // for shared bag
    router.get(
      "/:tripId/packing-list/shared/",
      this.controller.getSharedItems.bind(this.controller)
    );

    router.post(
      "/:tripId/packing-list/users/:userId",
      this.controller.addPackItem.bind(this.controller)
    );
    router.put(
      "/:tripId/packing-list/users/:userId",
      this.controller.editPackItem.bind(this.controller)
    );
    router.delete(
      "/:tripId/packing-list/users/:userId",
      this.controller.removePackItem.bind(this.controller)
    );

    //CRUD for wishlist
    router.get(
      "/:tripId/users/:userId/wishlist",
      this.controller.getAllWishlistItems.bind(this.controller)
    );

    //CRUD for calendar
    router.get(
      "/:tripId/users/:userId/calendar",
      this.controller.getAllCalendarItems.bind(this.controller)
    );

    //CRUD for comments
    router.get(
      "/:tripId/comments",
      this.controller.getAllComments.bind(this.controller)
    );
    router.post(
      "/:tripId/comments",
      this.controller.addComment.bind(this.controller)
    );
    // router.put(
    //   "/:tripId/comments",
    //   this.controller.updateComment.bind(this.controller)
    // );
    router.delete(
      "/:tripId/comments",
      this.controller.deleteComment.bind(this.controller)
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
