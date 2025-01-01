"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("orders", "status", {
      type: Sequelize.ENUM,
      values: ["Pending", "Processed", "Delievered", "Cancelled", "Refunded"],
      defaultValue: "Pending",
      allowNull: false,
    });
    await queryInterface.changeColumn("orders", "paymentStatus", {
      type: Sequelize.ENUM,
      values: ["Not Paid", "Paid", "Refunded"],
      defaultValue: "Not Paid",
      allowNull: false,
    });

    await queryInterface.changeColumn("orders", "paymentMethod", {
      type: Sequelize.ENUM,
      values: ["Credit Card", "EasyPiasa", "Bank Transfer", "Cash on Delivery"],
      defaultValue: "Cash on Delivery",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("orders", "status", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("orders", "paymentStatus", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
