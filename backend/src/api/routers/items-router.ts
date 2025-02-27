import express from "express";
import {createItem, deleteItem, updateItem} from "../controllers/items-controller.js";

const itemsRouter = express.Router();
itemsRouter.post("/", createItem);
itemsRouter.put("/", updateItem);
itemsRouter.delete("/:id", deleteItem);

export default itemsRouter;