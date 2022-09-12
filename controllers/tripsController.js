const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }
}

module.exports = TripsController;
