const express = require("express");
const router = express.Router();

class TripsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    //routes for trip info
    router.get("/", this.controller.getAllTrips.bind(this.controller));
    router.get("/:tripId", this.controller.getOneTrip.bind(this.controller));

    // routes for packing list
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

    //routes for wishlist

    // routes for calendar

    // routes for comments

    return router;
  }
}

module.exports = TripsRouter;
