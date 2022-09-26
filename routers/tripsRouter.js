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
      this.controller.getAllUserPackItems.bind(this.controller)
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
      "/:tripId/wishlist",
      this.controller.getAllWishlistItems.bind(this.controller)
    );
    router.post(
      "/:tripId/wishlist",
      this.controller.addWishlistItem.bind(this.controller)
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

    router.delete(
      "/:tripId/comments",
      this.controller.deleteComment.bind(this.controller)
    );

    return router;
  }
}

module.exports = TripsRouter;
