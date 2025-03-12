import {ColumnType, Generated, Insertable, Selectable, Updateable} from "kysely";

export interface ItemTable {
  id: Generated<number>,
  name: string,
  checked: boolean,
  list_id: number,
  created_at: ColumnType<Date, Date, never>,
  updated_at: ColumnType<Date, Date>
}

export type Item = Selectable<ItemTable>;
export type NewItem = Insertable<ItemTable>;
export type UpdateItem = Updateable<ItemTable>;