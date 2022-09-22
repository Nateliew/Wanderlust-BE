const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    // router.get("/:userId", this.controller.getOne.bind(this.controller));

    return router;
  }
}

function getRouter() {
  const db = require("../db/models/index");
  const { user } = db;
  const UsersController = require("../controllers/usersController");
  const usersController = new UsersController(user);
  const usersRouter = new UsersRouter(usersController).routes();
  return usersRouter;
}

// module.exports = getRouter;
module.exports = UsersRouter;
