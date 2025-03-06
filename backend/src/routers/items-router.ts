import express from "express";
import {createItem, deleteItem, updateItem} from "../controllers/items-controller.js";

const itemsRouter = express.Router({mergeParams: true});
itemsRouter.post("/", createItem);
itemsRouter.put("/:itemId", updateItem);
itemsRouter.delete("/:itemId", deleteItem);

export default itemsRouter;