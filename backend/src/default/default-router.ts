import express from "express";
import {unknownEndpointFallback} from "./default-controller.js";

const defaultRouter = express.Router();
defaultRouter.all("*", unknownEndpointFallback);

export default defaultRouter;
