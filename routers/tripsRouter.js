const express = require("express");
const router = express.Router();

class TripsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));

    // CRUD routes for overarching trip
    router.get("/", this.controller.getAllTrips.bind(this.controller));
    router.post("/", this.controller.insertOneTrip.bind(this.controller));
    router.delete("/:tripId", this.controller.deleteTrip.bind(this.controller));

    // delete trip DELETE

    router.patch("/:tripId", this.controller.updateTrip.bind(this.controller));
    router.get("/:tripId", this.controller.getOneTrip.bind(this.controller));
    // router.get("/:user", this.controller.getUserTrip.bind(this.controller));
    // edit trip : PUT

    //CRUD for packing list
    router.get(
      "/:tripId/packing-list",
      this.controller.getAllPackItems.bind(this.controller)
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
