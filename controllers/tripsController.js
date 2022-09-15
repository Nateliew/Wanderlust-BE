const BaseController = require("./baseController");

class TripsController extends BaseController {
  constructor(model, userModel, packingListModel, packingItemModel) {
    super(model);
    this.userModel = userModel;
    this.packingListModel = packingListModel;
    this.packingItemModel = packingItemModel;
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
      const items = await this.packingListModel.findAll({
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
    // const { itemAndQty, tripId, userId } = req.body;

    try {
      // const newItems = itemAndQty.map((item) => {
      //   return {
      //     tripId: tripId,
      //     userId: userId,
      //   };
      // });

      // const itemIds = itemAndQty.map((item) => item["itemId"]);

      // const newList = await this.packingListModel.create(newItems);

      const newList = await this.packingListModel.create({
        tripId: 2,
        userId: 2,
        itemId: 1,
        quantity: 4,
      });
      console.log(newList);

      // const selectedItems = await this.packingItemModel.findAll({
      //   where: {
      //     id: itemIds,
      //   },
      // });
      // console.log(selectedItems);
      // newList.setPackingItems(selectedItems);
      // return res.json(newList);
    } catch {}
  }

  async editPackItem(req, res) {}

  async removePackItem(req, res) {}
}

module.exports = TripsController;
