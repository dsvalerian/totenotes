import {Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import List from "./list.js";

@Table({
  tableName: "users",
  underscored: true,
})
class User extends Model<User> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  email: string;

  @Column
  passwordHash: string;

  @HasMany(() => List)
  lists: List[];

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}

export default User;