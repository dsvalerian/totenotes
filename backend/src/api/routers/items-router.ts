import express from "express";
import {createItem} from "../controllers/items-controller.js";

const itemsRouter = express.Router({mergeParams: true});
itemsRouter.post("/", createItem);

export default itemsRouter;