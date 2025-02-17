import {Request, Response} from "express";
import {ResponseBody} from "../types.js";

/**
 * Default fallback to be used for unknown endpoints.
 * @param req
 * @param res
 */
export const handleUnknownEndpoint = (req: Request, res: Response) => {
  const responseBody: ResponseBody = {
    success: false,
    message: `${req.originalUrl} is not a valid endpoint`
  };

  return res.status(404).json(responseBody);
};