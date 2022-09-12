const express = require("express");
const router = express.Router();

class TripsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));

    return router;
  }
}

module.exports = TripsRouter;
