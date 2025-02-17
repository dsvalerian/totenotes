import express from "express";
import {handleUnknownEndpoint} from "./fallback-controller.js";

const fallbackRouter = express.Router();
fallbackRouter.all("*", handleUnknownEndpoint);

export default fallbackRouter;
