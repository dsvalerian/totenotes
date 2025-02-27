import express from "express";
import {createList, deleteList, getAllLists, getList, updateList} from "../controllers/lists-controller.js";

const listsRouter = express.Router();
listsRouter.get("/", getAllLists);
listsRouter.get("/:id", getList);
listsRouter.post("/", createList);
listsRouter.put("/", updateList);
listsRouter.delete("/:id", deleteList);

export default listsRouter;