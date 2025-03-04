import {BelongsTo, Column, CreatedAt, Model, Table, UpdatedAt} from "sequelize-typescript";
import User from "./user.js";

@Table({
  tableName: "lists",
  underscored: true,
})
class List extends Model<List> {
  @Column
  id: number;

  @Column
  name: string;

  @BelongsTo(() => User)
  owner: User;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}

export default List;