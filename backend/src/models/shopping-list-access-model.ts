import sequelize from "../config/database.js";
import {DataTypes, Model} from "sequelize";
import List from "./shopping-lists-model.js";
import User from "./user-model.js";

export interface ListAccessAttributes {
  id: number,
  listId: number,
  userId: number
}

type ListAccessCreateAttributes = Omit<ListAccessAttributes, "id">;

const ListAccess = sequelize.define<Model<ListAccessAttributes, ListAccessCreateAttributes>>("ListAccess", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  listId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: List,
      key: "id"
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }
}, {
  tableName: "shopping_list_access",
  timestamps: true,
  underscored: true
});

ListAccess.belongsTo(List, {foreignKey: "listId"});
ListAccess.belongsTo(User, {foreignKey: "userId"});
List.hasMany(ListAccess, {foreignKey: "listId"});
User.hasMany(ListAccess, {foreignKey: "userId"});
export default ListAccess;