import express from "express";
import {createList, deleteList, getAllLists, getList, updateList} from "../controllers/lists-controller.js";

const listsRouter = express.Router();
listsRouter.get("/", getAllLists);
listsRouter.get("/:listId", getList);
listsRouter.post("/", createList);
listsRouter.put("/:listId", updateList);
listsRouter.delete("/:listId", deleteList);

export default listsRouter;