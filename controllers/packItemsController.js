const BaseController = require("./baseController");

class PackItemsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }
}

module.exports = PackItemsController;
