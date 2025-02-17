import express from "express";
import authRouter from "./auth/auth-router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json" with {type: "json"};

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default apiRouter;