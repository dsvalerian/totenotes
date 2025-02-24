import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DB_CONNECTION_URL;

if (!dbUrl) {
  throw new Error("Must provide a Postgres DB connection URL");
}

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  logging: process.env.LOG_SQL === "true"
});

export default sequelize;