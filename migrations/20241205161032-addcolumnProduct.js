"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("wishlist", "productName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("wishlist", "price", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("wishlist", "productName");
    await queryInterface.removeColumn("wishlist", "price");
  },
};
