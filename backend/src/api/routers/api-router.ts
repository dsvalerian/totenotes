import express from "express";
import authRouter from "./auth-router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger.json" with {type: "json"};
import listsRouter from "./lists-router.js";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/lists", listsRouter);
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default apiRouter;