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
      let response = await this.model.destroy({
        where: {
          id: Number(tripId),
        },
      });
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
      console.log(res);
    } catch (e) {
      return false;
    }
  }
  // CRUD for all packing list items belonging to a user
  async getAllUserPackItems(req, res) {
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

      console.log("items:", items);
      // DO FOR LOOP TO MAKE INTO COLUMNS DATA STRUCTURE
      //   "bagType": {
      //     id: "bagType",
      //     itemsUids: ["abc"],
      //   },
      // console.log("ITEMS:", items);
      const columnData = {};
      const sharedItemsUids = [];

      for (let itemRow of items) {
        const itemIdInfo = { [itemRow.itemUid]: itemRow.itemId };
        if (itemRow.bagType === "shared") {
          sharedItemsUids.push(itemIdInfo);
        } else {
          if (columnData[itemRow.bagType]) {
            columnData[itemRow.bagType] = {
              ...columnData[itemRow.bagType],
              id: itemRow.bagType,
              itemsUids: [...columnData[itemRow.bagType].itemsUids, itemIdInfo],
            };
          } else {
            columnData[itemRow.bagType] = {
              id: itemRow.bagType,
              itemsUids: [itemIdInfo],
            };
          }
        }
      }

      const sharedColumnData = {
        shared: {
          id: "shared",
          itemsUids: sharedItemsUids,
        },
      };

      console.log("columndata", columnData);
      // console.log("ITEMS:", items);
      return res.json({
        items: items,
        column: columnData,
        sharedColumn: sharedColumnData,
      });
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

      // HACK: REPEAT CODE FROM GET ALL SO THAT FRONTEND CAN UPDATE COLUMN ORDER
      const items = await this.tripItemModel.findAll({
        where: {
          tripId: tripId,
          userId: userId,
        },
        raw: true,
        order: sequelize.col("column_index"),
      });

      const columnData = {};
      const sharedItemsUids = [];

      for (let itemRow of items) {
        const itemIdInfo = { [itemRow.itemUid]: itemRow.itemId };
        if (itemRow.bagType === "shared") {
          sharedItemsUids.push(itemIdInfo);
        } else {
          if (columnData[itemRow.bagType]) {
            columnData[itemRow.bagType] = {
              ...columnData[itemRow.bagType],
              id: itemRow.bagType,
              itemsUids: [...columnData[itemRow.bagType].itemsUids, itemIdInfo],
            };
          } else {
            columnData[itemRow.bagType] = {
              id: itemRow.bagType,
              itemsUids: [itemIdInfo],
            };
          }
        }
      }

      const sharedColumnData = {
        shared: {
          id: "shared",
          itemsUids: sharedItemsUids,
        },
      };

      return res.json({
        newList: newList,
        column: columnData,
        sharedColumn: sharedColumnData,
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editPackItem(req, res) {
    // structure of tripItems: array of objects - {tripItemId, quantity, bagType, sharedItem, userId, tripId }
    const { itemUid, columnIndex, bagType } = req.body;
    console.log("editPack", req.body);

    try {
      const tripItem = await this.tripItemModel.findOne({
        where: { itemUid: itemUid },
      });
      tripItem.set({
        columnIndex: columnIndex,
        bagType: bagType,
      });
      await tripItem.save();

      return res.json();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removePackItem(req, res) {
    // tripItemIds is an array of tripItemsPK
    const { itemUid, bagType } = req.body;
    const { tripId, userId } = req.params;

    console.log(req.body);

    try {
      console.log("did this run?");
      if (itemUid !== undefined) {
        console.log("or did this run?");
        var tripItems = await this.tripItemModel.destroy({
          where: {
            itemUid: itemUid,
          },
        });
      } else if (bagType) {
        tripItems = await this.tripItemModel.destroy({
          where: {
            bagType: bagType,
          },
        });
      }

      // HACK: REPEAT CODE FROM GET ALL SO THAT FRONTEND CAN UPDATE COLUMN ORDER
      const items = await this.tripItemModel.findAll({
        where: {
          tripId: tripId,
          userId: userId,
        },
        raw: true,
        order: sequelize.col("column_index"),
      });

      const columnData = {};
      const sharedItemsUids = [];

      for (let itemRow of items) {
        const itemIdInfo = { [itemRow.itemUid]: itemRow.itemId };
        if (itemRow.bagType === "shared") {
          sharedItemsUids.push(itemIdInfo);
        } else {
          if (columnData[itemRow.bagType]) {
            columnData[itemRow.bagType] = {
              ...columnData[itemRow.bagType],
              id: itemRow.bagType,
              itemsUids: [...columnData[itemRow.bagType].itemsUids, itemIdInfo],
            };
          } else {
            columnData[itemRow.bagType] = {
              id: itemRow.bagType,
              itemsUids: [itemIdInfo],
            };
          }
        }
      }

      const sharedColumnData = {
        shared: {
          id: "shared",
          itemsUids: sharedItemsUids,
        },
      };
      // returned tripItems is an integer of total rows deleted
      return res.json({
        tripItems: tripItems,
        column: columnData,
        sharedColumn: sharedColumnData,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //CRUD for wishlist
  async getAllWishlistItems(req, res) {
    const { tripId } = req.params;
    console.log(tripId, req.params, "trip id in get all wl items");
    try {
      const wishlistItems = await this.wishListModel.findAll({
        where: {
          tripId: Number(tripId),
        },
      });
      console.log(wishlistItems, "wishlist items in get all");
      return res.json(wishlistItems);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addWishlistItem(req, res) {
    console.log("Add wishlist item", req.params, req.body);
    const { tripId } = req.params;
    const { placeName } = req.body;
    console.log(
      placeName,
      tripId,
      req.params,
      req.body,
      "place name, tripid, req params, body"
    );
    try {
      console.log("helo in add wishlist item", placeName, req.body);
      const newItem = await this.wishListModel.create({
        placeName: placeName,
        tripId: tripId,
      });
      return res.json(newItem);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removeWishlistItem(req, res) {
    const { placeName } = req.body;
    console.log(req.body);
    try {
      let res = await this.wishListModel.destroy({
        where: {
          place_name: req.body.place_name,
        },
      });
      const data = await this.wishListModel.findAll({
        where: {
          tripId: Number(tripId),
        },
      });
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: true, msg: error });
    }
  }

  //CRUD for calendar
  async getAllCalendarItems(req, res) {}

  //////COMMENTS HERE

  //CRUD for comments
  async addComment(req, res) {
    console.log("AddComment", req.params);
    const { tripId } = req.params;
    console.log(req.params, req.body);
    const { user_id, content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        text: content,
        trip_id: tripId,
        user_id: user_id,
      });
      return res.json(newComment);
      console.log(newComment);
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
    const { commentId, tripId } = req.body;
    console.log(req.body);
    console.log(commentId);
    try {
      let response = await this.commentModel.destroy({
        where: {
          id: Number(commentId),
        },
      });
      const comments = await this.commentModel.findAll({
        where: {
          tripId: Number(tripId),
        },
      });
      return res.json(comments);
    } catch (e) {
      return false;
    }
  }
}

module.exports = TripsController;
