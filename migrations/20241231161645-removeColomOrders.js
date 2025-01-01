"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameColumn("orders", "orderdProductsId");
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn("orders", "orderdProductsId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
