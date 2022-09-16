const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel, userTripModel, itemModel, tripItemModel) {
    super(model);
    this.userModel = userModel;
    this.userTripModel = userTripModel;
    this.itemModel = itemModel;
    this.tripItemModel = tripItemModel;
  }

  // CRUD for all trips belonging to a user
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
      return res.json(trip);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // CRUD for all packing list items belonging to a user
  async getAllPackItems(req, res) {
    console.log(req.params);
    const { tripId } = req.params;
    const { userId } = req.body;
    try {
      const items = await this.tripItemModel.findAll({
        where: {
          tripId: tripId,
          userId: userId,
        },
      });
      return res.json(items);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addPackItem(req, res) {
    //structure of itemsList: array of objects - {itemId, quantity, bagType, sharedItem, userId, tripId}
    const { itemsList } = req.body;
    try {
      const newList = await this.tripItemModel.bulkCreate([itemsList]);
      return res.json(newList);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editPackItem(req, res) {
    // structure of tripItems: array of objects - {tripItemId, quantity, bagType, sharedItem, userId, tripId }
    const { tripItems } = req.body;

    try {
      tripItems.forEach(async (tripItemRow) => {
        const tripItem = await this.tripItemModel.findByPk(
          tripItemRow.tripItemId
        );
        tripItem.set({
          quantity: tripItemRow.quantity,
          bagType: tripItemRow.bagType,
          sharedItem: tripItemRow.sharedItem,
          userId: tripItemRow.userId,
        });
        await tripItem.save();
      });
      return res.json();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removePackItem(req, res) {
    // tripItemIds is an array of tripItemsPK
    const { tripItemIds } = req.body;
    console.log(tripItemIds);

    try {
      const tripItems = await this.tripItemModel.destroy({
        where: {
          id: tripItemIds,
        },
      });

      // returned tripItems is an integer of total rows deleted
      return res.json(tripItems);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //CRUD for wishlist
  async getAllWishlistItems(req, res) {}
  //CRUD for calendar
  async getAllCalendarItems(req, res) {}
  //CRUD for comments
  async getAllComments(req, res) {}
}

module.exports = TripsController;
