"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("orders", "undefined");
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn("orders", "undefined", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
