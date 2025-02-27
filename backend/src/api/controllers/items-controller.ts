import {Request, Response} from "express";
import {errorResponse, successResponse} from "../utils.js";
import Item from "../../models/item-model.js";

export const createItem = async (req: Request, res: Response) => {
  console.info("Creating new item");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Not authorized to create items"));
  }

  const newItem = await Item.create({
    name: req.body.name,
    listId: Number(req.body.listId)
  });

  if (!newItem) {
    console.error("Could not create new item");
    return res.status(500).json(errorResponse("Could not create item"));
  }

  return res.status(201).json(newItem.get());
};

export const updateItem = async (req: Request, res: Response) => {
  console.info("Updating item");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to update item"));
  }

  // Get the item from the db
  const item = await Item.findByPk(req.body.id);
  if (!item) {
    return res.status(404).json(errorResponse("Item not found"));
  }

  await item.update({name: req.body.name});

  return res.json(item.get());
};

export const deleteItem = async (req: Request, res: Response) => {
  console.info("Deleting item");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to delete item"));
  }

  // Get the item from the db
  const item = await Item.findByPk(req.params.id);
  if (!item) {
    return res.status(404).json(errorResponse("Item not found"));
  }

  await item.destroy();
  return res.json(successResponse("Item deleted"));
};