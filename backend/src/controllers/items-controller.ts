import {Request, Response} from "express";
import {errorResponse, successResponse} from "../utils.js";
import {db} from "../database/database.js";

export const createItem = async (req: Request, res: Response) => {
  console.info("Creating new item");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Not authorized to create items"));
  }

  const currentTime = new Date();
  const newItem = await db
      .insertInto("item")
      .values({
        name: req.body.name,
        list_id: parseInt(req.params.listId),
        created_at: currentTime,
        updated_at: currentTime
      })
      .returningAll()
      .executeTakeFirst();

  if (!newItem) {
    console.error("Could not create new item");
    return res.status(500).json(errorResponse("Could not create item"));
  }

  return res.status(201).json(newItem);
};

export const updateItem = async (req: Request, res: Response) => {
  console.info("Updating item", req.body);

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to update item"));
  }

  // Get the item from the db
  const updatedItem = await db
      .updateTable("item")
      .set({
        name: req.body.name,
        updated_at: new Date()
      })
      .where("id", "=", req.user.id)
      .returningAll()
      .executeTakeFirst();

  if (!updatedItem) {
    return res.status(404).json(errorResponse("Item not found"));
  }

  return res.json(updatedItem);
};

export const deleteItem = async (req: Request, res: Response) => {
  console.info("Deleting item");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to delete item"));
  }

  const deletedItem = await db
      .deleteFrom("item")
      .where("id", "=", parseInt(req.params.itemId))
      .returningAll()
      .executeTakeFirst();

  // Get the item from the db
  if (!deletedItem) {
    return res.status(404).json(errorResponse("Item could not be deleted"));
  }

  return res.json(successResponse("Item deleted"));
};