"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("packingitems", [
      {
        item_name: "airline check in",
        category: "boarding",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "boarding pass",
        category: "boarding",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "passport / visa / id",
        category: "boarding",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "cash",
        category: "funds",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "credit card",
        category: "funds",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "water bottle",
        category: "personal",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "medicine",
        category: "personal",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "hand sanitizer",
        category: "personal",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "laptop/tablet",
        category: "electronics",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "phone charger",
        category: "electronics",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "international plug adaptor",
        category: "electronics",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "t-shirt",
        category: "clothing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "shorts",
        category: "clothing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "underwear",
        category: "clothing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "sandals",
        category: "clothing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "sanitary pads",
        category: "toiletries",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "toothbrush",
        category: "toiletries",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "toothpaste",
        category: "toiletries",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "bodywash",
        category: "toiletries",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "umbrella",
        category: "accessories",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "sunglasses",
        category: "accessories",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "backpack",
        category: "accessories",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "disinfecting wipes",
        category: "first aid",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "bandages",
        category: "first aid",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "panadol",
        category: "first aid",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "charcoal pills",
        category: "first aid",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "cold/flu medicine",
        category: "first aid",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("packingitems", null, {});
  },
};
