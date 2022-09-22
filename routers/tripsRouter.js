const express = require("express");
const router = express.Router();

class TripsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));

    // CRUD routes for trip
    router.get(
      "/user/:userId",
      this.controller.getAllTrips.bind(this.controller)
    );
    router.post("/", this.controller.insertOneTrip.bind(this.controller));
    router.delete("/:tripId", this.controller.deleteTrip.bind(this.controller));

    // delete trip DELETE

    router.get("/:tripId", this.controller.getOneTrip.bind(this.controller));
    // edit trip : PUT

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

module.exports = TripsRouter;
