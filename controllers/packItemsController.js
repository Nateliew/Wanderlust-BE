const BaseController = require("./baseController");

class PackItemsController extends BaseController {
  constructor(model) {
    super(model);
  }

  getAll = async (req, res) => {
    try {
      const itemsList = await this.model.findAll({ raw: true });

      return res.json(itemsList);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllByCat = async (req, res) => {
    try {
      const itemsList = await this.model.findAll({ raw: true });
      // modify data structure with category as key and value made up of itemId and itemName object
      let itemByCategory = {};
      for (let item of itemsList) {
        itemByCategory[item.category]
          ? (itemByCategory[item.category] = [
              ...itemByCategory[item.category],
              { [item.id]: item.itemName },
            ])
          : (itemByCategory[item.category] = [{ [item.id]: item.itemName }]);
      }
      return res.json(itemByCategory);
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
