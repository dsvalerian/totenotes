import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";

export interface ListAttributes {
  id: number,
  ownerId: number,
  name: string,
}

type ListCreateAttributes = Omit<ListAttributes, "id">;

const List = sequelize.define<Model<ListAttributes, ListCreateAttributes>>("List", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "shopping_lists",
  timestamps: true,
  underscored: true
});

export default List;