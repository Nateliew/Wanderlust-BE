"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        first_name: "shared",
        last_name: "user",
        email: "shared@shared.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "John",
        last_name: "Doe",
        email: "john@john.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@jane.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Jill",
        last_name: "Brown",
        email: "jill@jill.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("trips", [
      {
        country: "Japan",
        start_date: new Date(2022, 10, 10),
        end_date: new Date(2022, 10, 23),
        duration: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        country: "Hong Kong",
        start_date: new Date(2022, 9, 9),
        end_date: new Date(2022, 9, 13),
        duration: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("user_trips", [
      {
        user_id: 1,
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        trip_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        trip_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("trips", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("packingitems", null, {});
    // await queryInterface.bulkDelete("user_trips", null, {});
  },
};
