import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import User from "./user-model.js";

export interface ListAttributes {
  id: number,
  ownerId: number,
  name: string,
}

type ListCreateAttributes = Omit<ListAttributes, "id">;

const List = sequelize.define<Model<ListAttributes, ListCreateAttributes>>("list", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

export default List;