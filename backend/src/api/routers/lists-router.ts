import express from "express";
import {createList, getAllLists} from "../controllers/lists-controller.js";

const listsRouter = express.Router();
listsRouter.get("/", getAllLists);
listsRouter.post("/", createList);

export default listsRouter;