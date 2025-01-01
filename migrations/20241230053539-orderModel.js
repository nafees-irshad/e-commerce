"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      orderdProductsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orderdproducts",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      customer: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Pending", "Processed", "Delievered", "Cancelled", "Refunded"],
        default: "Pending",
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.ENUM,
        values: ["Not Paid", "Paid", "Refunded"],
        default: "Not Paid",
        allowNull: false,
      },
      shippingAdress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      billingAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentMethod: {
        type: Sequelize.ENUM,
        values: [
          "Credit Card",
          "EasyPiasa",
          "Bank Transfer",
          "Cash on Delivery",
        ],
        default: "Cash on Delivery",
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
