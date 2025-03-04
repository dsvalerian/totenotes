import {Request, Response} from "express";
import {errorResponse, successResponse} from "../utils.js";
import List from "../../models/list.js";
import Item from "../../models/item.js";
import ListAccess from "../../models/item-access.js";
import User from "../../models/user.js";

export const getAllLists = async (req: Request, res: Response) => {
  console.info("Getting all lists");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to get lists"));
  }

  const allLists = await List.findAll({
    include: {
      model: User,
      where: {
        id: req.user.id
      },
      required: true,
      attributes: []
    }
  });

  if (allLists) {
    return res.json(allLists.map(model => model.get()));
  }
};

export const getList = async (req: Request, res: Response) => {
  console.info("Getting list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to get list"));
  }

  const list = await List.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Item,
      order: [
        ["createdAt", "DESC"]
      ]
    }
  });

  if (!list) {
    return res.status(404).json(errorResponse("ListModel not found"));
  }

  return res.json(list.get());
};

export const createList = async (req: Request, res: Response) => {
  console.info("Creating new list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to create list"));
  }

  // Create the list in the db
  const list = await List.create({
    name: req.body.name,
    ownerId: req.user.id
  });

  list.addUsers(User.findByPk(req.user.id));

  return res.status(201).json(list.get());
};

export const updateList = async (req: Request, res: Response) => {
  console.info("Updating list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to update list"));
  }

  // Get the list from the db
  const list = await List.findByPk(req.body.id);
  if (!list) {
    return res.status(404).json(errorResponse("ListModel not found"));
  }

  await list.update({name: req.body.name});

  return res.json(list.get());
};

export const deleteList = async (req: Request, res: Response) => {
  console.info("Deleting list");

  if (!req.user?.id) {
    console.info("Unauthorized");
    return res.status(400).json(errorResponse("Unauthorized to delete list"));
  }

  // Get the list from the db
  const list = await List.findByPk(req.params.id, {
    include: {
      model: Item,
    }
  });
  if (!list) {
    return res.status(404).json(errorResponse("ListModel not found"));
  }

  await list.destroy();
  return res.json(successResponse("ListModel deleted"));
};