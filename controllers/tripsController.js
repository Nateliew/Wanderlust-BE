const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  // Retrieve specific sighting
  async getAll(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOne(req, res) {
    const { country, startDate, endDate, duration } = req.body;
    try {
      // Create new sighting
      const newTrip = await this.model.create({
        country: country,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
      });
      return res.json(newTrip);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = TripsController;
