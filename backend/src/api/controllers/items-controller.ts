import {Request, Response} from "express";
import {errorResponse} from "../utils.js";
import Item from "../../models/item-model.js";

export const createItem = async (req: Request, res: Response) => {
  console.info("Creating new item");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Not authorized to create items"));
  }

  const newItem = await Item.create({
    name: req.body.name,
    listId: Number(req.params.listId)
  });

  if (!newItem) {
    console.error("Could not create new item");
    return res.status(500).json(errorResponse("Could not create item"));
  }

  return res.status(201).json(newItem.get());
};