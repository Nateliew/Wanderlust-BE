const express = require("express");
const router = express.Router();

class TripsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // CRUD routes for overarching trip
    router.get("/", this.controller.getAllTrips.bind(this.controller));
    //add trip POST
    // delete trip DELETE

    router.get("/:tripId", this.controller.getOneTrip.bind(this.controller));
    // edit trip : PUT

    //CRUD for packing list
    router.get(
      "/:tripId/packing-list",
      this.controller.getAllPackItems.bind(this.controller)
    );

    router.post(
      "/:tripId/packing-list",
      this.controller.addPackItem.bind(this.controller)
    );
    router.put(
      "/:tripId/packing-list",
      this.controller.editPackItem.bind(this.controller)
    );
    router.delete(
      "/:tripId/packing-list",
      this.controller.removePackItem.bind(this.controller)
    );

    //CRUD for wishlist
    router.get(
      "/:tripId/wishlist",
      this.controller.getAllWishlistItems.bind(this.controller)
    );

    //CRUD for calendar
    router.get(
      "/:tripId/calendar",
      this.controller.getAllCalendarItems.bind(this.controller)
    );

    //CRUD for comments
    router.get(
      "/:tripId/comments",
      this.controller.getAllComments.bind(this.controller)
    );

    return router;
  }
}

module.exports = TripsRouter;
