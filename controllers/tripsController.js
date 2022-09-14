const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  // get all trips belonging to a user
  async getAll(req, res) {
    const { userId } = req.body;
    try {
      const trips = await this.model.findAll({
        include: [
          {
            model: this.userModel,
            through: { attributes: [] },
            where: {
              id: userId,
            },
          },
        ],
      });
      return res.json(trips);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const { tripId } = req.body;
    try {
      const trip = await this.model.findByPk(tripId, {
        include: [
          {
            model: this.userModel,
            through: { attributes: [] },
          },
        ],
      });
      return res.json(trip);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = TripsController;
