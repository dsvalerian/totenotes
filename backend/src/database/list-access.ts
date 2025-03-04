import {Insertable, Selectable, Updateable} from "kysely";

export interface ListAccessTable {
  user_id: number,
  list_id: number,
}

export type ListAccess = Selectable<ListAccessTable>;
export type NewListAccess = Insertable<ListAccessTable>;
export type UpdateListAccess = Updateable<ListAccessTable>;