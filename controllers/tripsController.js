const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel, userTripModel, commentModel) {
    super(model);
    this.userTripModel = userTripModel;
    this.userModel = userModel;
    this.commentModel = commentModel;
  }

  // CRUD functions for trips belonging to a user
  async getAllTrips(req, res) {
    const { userId } = req.params;
    try {
      const trips = await this.model.findAll({
        include: [
          {
            model: this.userModel,
            where: {
              id: userId,
            },
            through: { attributes: [] },
          },
        ],
      });

      return res.json(trips);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOneTrip(req, res) {
    const { country, startDate, endDate, duration, userId } = req.body;
    try {
      // Create new trip
      const newTrip = await this.model.create({
        country: country,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        // userId: userId,
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
    const { tripId } = req.params;
    try {
      const trip = await this.model.findByPk(tripId, {
        include: [
          {
            model: this.userModel,
            through: { attributes: [] },
          },
        ],
      });
      console.log(trip);
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

  //////COMMENTS HERE

  //CRUD for comments
  async addComment(req, res) {
    console.log("AddComment", req.params);
    const { tripId } = req.params;
    const { user_id, content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        text: content,
        trip_id: tripId,
        user_id: user_id,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllComments(req, res) {
    const { tripId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          tripId: Number(tripId),
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteComment(req, res) {
    const { commentId } = req.body;
    console.log(req.body);
    console.log(commentId);
    try {
      let res = await this.commentModel.destroy({
        where: {
          id: Number(commentId),
        },
      });
      console.log(res);
    } catch (e) {
      return false;
    }
  }

  // async updateComment(req, res) {
  //   const { trip_id } = req.params;
  //   const { user_id, content } = req.body;
  //   try {
  //     const newComment = await this.commentModel.create({
  //       text: content,
  //       trip_id: trip_id,
  //       user_id: user_id,
  //     });
  //     return res.json(newComment);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = TripsController;
