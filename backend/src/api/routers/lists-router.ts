import express from "express";
import {createList, getAllLists, getList} from "../controllers/lists-controller.js";

const listsRouter = express.Router();
listsRouter.get("/", getAllLists);
listsRouter.get("/:id", getList);
listsRouter.post("/", createList);

export default listsRouter;