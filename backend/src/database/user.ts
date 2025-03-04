import {ColumnType, Generated, Insertable, Selectable, Updateable} from "kysely";

export interface UserTable {
  id: Generated<number>,
  email: string,
  password_hash: string,
  created_at: ColumnType<Date, Date, never>,
  updated_at: ColumnType<Date, Date>
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;