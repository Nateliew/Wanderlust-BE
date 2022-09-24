const express = require("express");
const router = express.Router();

class PackItemsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll);
    router.post("/", this.controller.insertOne);
    router.delete("/", this.controller.deleteOne);
    // router.get("/by-category", this.controller.getAllByCat);

    return router;
  }
}

// function getRouter() {
//   const db = require("../db/models/index");
//   const { item } = db;
//   const PackItemsController = require("../controllers/packItemsController");
//   const packItemsController = new PackItemsController(item);
//   const packItemsRouter = new PackItemsRouter(packItemsController).routes();
//   return packItemsRouter;
// }

// module.exports = getRouter;
module.exports = PackItemsRouter;
