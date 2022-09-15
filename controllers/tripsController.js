const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  // CRUD functions for trips belonging to a user
  async getAllTrips(req, res) {
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

  async getOneTrip(req, res) {
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

  // CRUD functions for trips belonging to a user
  async getAllPackItems(req, res) {}
  //CRUD for wishlist
  async getAllWishlistItems(req, res) {}
  //CRUD for calendar
  async getAllCalendarItems(req, res) {}
  //CRUD for comments
  async getAllComments(req, res) {}
}

module.exports = TripsController;
