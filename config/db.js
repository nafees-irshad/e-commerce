//load environment variable
require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

//test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established scuccesfully");
  } catch (error) {
    console.log("Error establising connection", error);
  }
}

testConnection();

module.exports = sequelize;
