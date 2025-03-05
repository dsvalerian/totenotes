import {Request, Response} from "express";
import {errorResponse, successResponse} from "../utils.js";
import {db} from "../../database/database.js";

export const getAllLists = async (req: Request, res: Response) => {
  console.info("Getting all lists");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to get lists"));
  }

  const allLists = await db
      .selectFrom("list")
      .where("owner_id", "=", req.user.id)
      .selectAll()
      .execute();

  if (!allLists) {
    return res.status(500).json(errorResponse("Could not get lists"));
  }

  return res.json(allLists);
};

export const getList = async (req: Request, res: Response) => {
  console.info("Getting list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to get list"));
  }

  // todo check list access

  const list = await db
      .selectFrom("list")
      .where("id", "=", parseInt(req.params.id))
      .selectAll()
      .executeTakeFirst();

  if (!list) {
    return res.status(404).json(errorResponse("ListModel not found"));
  }

  const listItems = await db
      .selectFrom("item")
      .where("list_id", "=", parseInt(req.params.id))
      .selectAll()
      .execute();

  return res.json({...list, items: listItems});
};

export const createList = async (req: Request, res: Response) => {
  console.info("Creating new list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to create list"));
  }

  const currentTime = new Date();
  const list = await db
      .insertInto("list")
      .values({
        name: req.body.name,
        owner_id: req.user.id,
        created_at: currentTime,
        updated_at: currentTime
      })
      .returningAll()
      .executeTakeFirst();

  if (!list) {
    return res.status(500).json(errorResponse("Could not create list"));
  }

  return res.status(201).json(list);
};

export const updateList = async (req: Request, res: Response) => {
  console.info("Updating list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to update list"));
  }

  // todo check list access

  // Get the list from the db
  const updatedList = await db
      .updateTable("list")
      .set({
        name: req.body.name,
        updated_at: new Date()
      })
      .where("id", "=", parseInt(req.params.id))
      .returningAll()
      .executeTakeFirst();

  if (!updatedList) {
    return res.status(500).json(errorResponse("Could not update list"));
  }

  return res.json(updatedList);
};

export const deleteList = async (req: Request, res: Response) => {
  console.info("Deleting list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to delete list"));
  }

  // todo check list access

  const deletedItem = await db
      .deleteFrom("list")
      .where("id", "=", parseInt(req.params.id))
      .returningAll()
      .executeTakeFirst();

  if (!deletedItem) {
    return res.status(404).json(errorResponse("Could not delete list"));
  }

  return res.json(successResponse("List deleted"));
};