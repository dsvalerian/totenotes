import {ColumnType, Generated, Insertable, Selectable, Updateable} from "kysely";

export interface ListTable {
  id: Generated<number>,
  name: string,
  owner_id: number,
  created_at: ColumnType<Date, Date, never>,
  updated_at: ColumnType<Date, Date>
}

export type List = Selectable<ListTable>;
export type NewList = Insertable<ListTable>;
export type UpdateList = Updateable<ListTable>;