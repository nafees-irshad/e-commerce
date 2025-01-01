const { DataTypes, ENUM } = require("sequelize");
const sequelize = require("../config/db");

const Orders = sequelize.define(
  "Orders",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    customer: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Pending", "Processed", "Delievered", "Cancelled", "Refunded"],
      defaultValue: "Pending",
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM,
      values: ["Not Paid", "Paid", "Refunded"],
      defaultValue: "Not Paid",
      allowNull: false,
    },
    shippingAdress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM,
      values: ["Credit Card", "EasyPiasa", "Bank Transfer", "Cash on Delivery"],
      defaultValue: "Cash on Delivery",
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Orders;
