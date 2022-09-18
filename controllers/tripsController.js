const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel, userTripModel) {
    super(model);
    this.userTripModel = userTripModel;
    this.userModel = userModel;
  }

  // CRUD functions for trips belonging to a user
  async getAllTrips(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // // get all trips belonging to a user
  // async getUserTrip(req, res) {
  //   try {
  //     const trips = await this.userTripModel.findAll({
  //       include: [
  //         {
  //           model: this.userTripModel,
  //           through: { attributes: [] },
  //           // where: {
  //           //   id: userId,
  //           // },
  //         },
  //       ],
  //     });
  //     return res.json(trips);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  async insertOneTrip(req, res) {
    const { country, startDate, endDate, duration, userId } = req.body;
    console.log(req.body);
    try {
      // Create new trip
      const newTrip = await this.model.create({
        country: country,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        userId: userId,
      });

      // create user trip
      const newUserTrip = await this.userTripModel.create({
        userId: userId,
        tripId: newTrip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.json({
        id: newTrip.id,
      });
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

  async deleteTrip(req, res) {
    const { tripId } = req.params;
    console.log(req.body);
    try {
      console.log("deleting trip by id", tripId);
      let resUserTrips = await this.userTripModel.destroy({
        where: {
          tripId: Number(tripId),
        },
      });
      let res = await this.model.destroy({
        where: {
          id: Number(tripId),
        },
      });
      console.log(res);
    } catch (e) {
      return false;
    }
  }

  async updateTrip(req, res) {
    try {
      await this.model
        .update(req.body, {
          where: {
            id: req.body.id,
          },
        })
        .then((result) => {
          // check the first element in the array if there are rows affected
          if (result[0] > 0) {
            res.status(200).send({ message: "data found" });
          } else {
            return res.status(422).send({ message: "no data found" });
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "updating table failed" });
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
