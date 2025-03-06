import {db} from "./database/database.js";

export const errorResponse = (message: string) => {
  return {
    error: message
  };
};

export const successResponse = (message: string) => {
  return {
    message: message
  };
};

export const findUserById = async (id: number) => {
  return await db
  .selectFrom("user")
  .where("id", "=", id)
  .selectAll()
  .executeTakeFirst();
};

export const findUserByEmail = async (email: string) => {
  return await db
  .selectFrom("user")
  .where("email", "=", email)
  .selectAll()
  .executeTakeFirst();
};