import sequelize from "../config/database.js";
import {DataTypes, Model} from "sequelize";
import List from "./list-model.js";

interface ItemAttributes {
  id: number,
  listId: number,
  name: string
}

type ItemCreateAttributes = Omit<ItemAttributes, "id">;

const Item = sequelize.define<Model<ItemAttributes, ItemCreateAttributes>>("item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  listId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: List,
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

Item.belongsTo(List);
List.hasMany(Item, {foreignKey: "listId"});
export default Item;