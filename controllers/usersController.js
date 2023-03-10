const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOneUser(req, res) {
    const { name, email } = req.body;
    // console.log(req.body);
    try {
      const user = await this.model.findOrCreate({
        where: { email: email },
        defaults: {
          firstName: name,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getTripUsers(req, res) {
    const { tripId } = req.params;
    // console.log(req.body);
    try {
      const tripUsers = await this.model.findAll({
        where: { tripId: tripId },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
