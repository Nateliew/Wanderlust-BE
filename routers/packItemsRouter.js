const express = require("express");
const router = express.Router();

class PackItemsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));

    return router;
  }
}

module.exports = PackItemsRouter;
