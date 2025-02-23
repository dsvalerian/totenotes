import List from "../../models/shopping-lists-model.js";
import {Request, Response} from "express";
import {errorResponse} from "../utils.js";
import ListAccess from "../../models/shopping-list-access-model.js";

export const getAllLists = async (req: Request, res: Response) => {
  console.info("Getting all lists");

  if (!req.user?.id) {
    return res.status(400).json(errorResponse("Unauthorized to get lists"));
  }

  const allLists = await List.findAll({
    include: {
      model: ListAccess,
      where: {
        userId: req.user.id
      },
      required: true,
      attributes: []
    }
  });

  if (allLists) {
    const allListMetadata = allLists.map(model => {
      console.log(model.get());
      return model.get();
    });

    return res.json(allListMetadata);
  }
};

export const createList = async (req: Request, res: Response) => {
  console.info("Creating new list");

  if (!req.user?.id) {
    return res.status(400).json(errorResponse("Unauthorized to create list"));
  }

  // Create the list in the db
  const list = await List.create({
    name: req.body.name,
    ownerId: req.user.id
  });

  // Create the list access entry in the db
  await ListAccess.create({
    listId: list.get().id,
    userId: req.user.id
  });

  return res.json(list.get());
};