import {UserTable} from "./user.js";
import {ListTable} from "./list.js";
import {ItemTable} from "./item.js";
import {ListAccessTable} from "./list-access.js";
import {Kysely, PostgresDialect} from "kysely";
import {Pool} from "pg";
import dotenv from "dotenv";

export interface Database {
  user: UserTable,
  list: ListTable,
  item: ItemTable,
  list_access: ListAccessTable,
}

dotenv.config();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ""),
    user: process.env.DB_USER,
    max: parseInt(process.env.DB_MAX || "")
  })
});

export const db = new Kysely<Database>({
  dialect,
});