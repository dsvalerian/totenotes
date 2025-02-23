import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import ListAccess from "./shopping-list-access-model.js";

export interface UserAttributes {
  id: number,
  email: string,
  passwordHash: string
}

type UserCreateAttributes = Omit<UserAttributes, "id">;

const User = sequelize.define<Model<UserAttributes, UserCreateAttributes>>("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "users",
  timestamps: true,
  underscored: true
});

export default User;