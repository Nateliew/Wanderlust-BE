const BaseController = require("./baseController");

class PackItemsController extends BaseController {
  constructor(model) {
    super(model);
  }

  getAll = async (req, res) => {
    try {
      // raw list of all item rows
      const allItems = await this.model.findAll({ raw: true });

      const itemsMap = {};

      // to render out list of items by category on front end
      const itemByCategory = {};
      for (let item of allItems) {
        itemByCategory[item.category]
          ? (itemByCategory[item.category] = [
              ...itemByCategory[item.category],
              { [item.id]: item.itemName },
            ])
          : (itemByCategory[item.category] = [{ [item.id]: item.itemName }]);

        itemsMap[item.id] = item;
      }
      console.log("2:", itemByCategory);
      // render items column for matching of itemIds
      const itemsIds = [];
      allItems.forEach((item) => {
        itemsIds.push(item.id);
      });
      const itemsColumn = {
        id: "items-catalog",
        itemsIds: itemsIds,
      };

      return res.json({
        rawAllItems: allItems,
        itemsMap: itemsMap,
        itemByCategory: itemByCategory,
        itemsColumn: itemsColumn,
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  insertOne = async (req, res) => {
    const { itemName } = req.body;

    try {
      const newItem = await this.model.create({
        itemName: itemName,
        category: "Others (Added by Community)",
      });

      const newAllItems = await this.model.findAll({ raw: true });
      return res.json(newAllItems);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  deleteOne = async (req, res) => {
    const { id } = req.body;
    try {
      const item = await this.model.findByPk(id);
      item.destroy();
      const newAllItems = await this.model.findAll({ raw: true });
      return res.json(newAllItems);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = PackItemsController;
