const BaseController = require("./baseController");
const sequelize = require("sequelize");

class TripsController extends BaseController {
  constructor(
    model,
    userModel,
    userTripModel,
    itemModel,
    tripItemModel,
    commentModel,
    wishListModel,
    calendarModel
  ) {
    super(model);
    this.userModel = userModel;
    this.userTripModel = userTripModel;
    this.itemModel = itemModel;
    this.tripItemModel = tripItemModel;
    this.commentModel = commentModel;
    this.wishListModel = wishListModel;
    this.calendarModel = calendarModel;
  }

  // CRUD for all trips belonging to a user
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
    const { tripId, userId } = req.params;
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
  // CRUD for all packing list items belonging to a user
  async getAllPackItems(req, res) {
    const { tripId, userId } = req.params;
    try {
      const items = await this.tripItemModel.findAll({
        where: {
          tripId: tripId,
          userId: userId,
        },
        raw: true,
        order: sequelize.col("column_index"),
      });

      // DO FOR LOOP TO MAKE INTO COLUMNS DATA STRUCTURE
      //   "bagType": {
      //     id: "bagType",
      //     itemsUids: ["abc"],
      //   },
      // console.log("ITEMS:", items);
      const columnData = {};

      for (let itemRow of items) {
        console.log("itemRow", itemRow.bagType);
        console.log("itemUid", itemRow.itemUid);
        if (columnData[itemRow.bagType]) {
          console.log("did this run?");
          columnData[itemRow.bagType] = {
            ...columnData[itemRow.bagType],
            id: itemRow.bagType,
            itemsUids: [
              ...columnData[itemRow.bagType].itemsUids,
              itemRow.itemUid,
            ],
          };
        } else {
          console.log("or did this run?");
          columnData[itemRow.bagType] = {
            id: itemRow.bagType,
            itemsUids: [itemRow.itemUid],
          };
        }
      }

      console.log("columndata", columnData);
      // console.log("ITEMS:", items);
      return res.json({ items: items, column: columnData });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getSharedItems(req, res) {
    const { tripId } = req.params;
    try {
      const sharedItems = await this.tripItemModel.findAll({
        where: {
          tripId: tripId,
          sharedItem: true,
        },
        raw: true,
        order: sequelize.col(columnIndex),
      });
      return res.json(sharedItems);
    } catch (err) {}
  }

  async addPackItem(req, res) {
    //structure of itemsList: array of objects - {itemId, quantity, bagType, sharedItem, userId, tripId}
    const { tripId, userId } = req.params;
    const { itemId, quantity, bagType, sharedItem, itemUid, columnIndex } =
      req.body;
    console.log(req.body);
    try {
      const newList = await this.tripItemModel.create({
        itemId: itemId,
        quantity: quantity,
        bagType: bagType,
        sharedItem: false,
        userId: userId,
        tripId: tripId,
        itemUid: itemUid,
        columnIndex: columnIndex,
      });
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
}

module.exports = TripsController;
