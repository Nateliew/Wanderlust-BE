const BaseController = require("./baseController");

class PackItemsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getAll(req, res) {
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

      console.log(itemByCategory);
      return res.json(itemByCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = PackItemsController;
