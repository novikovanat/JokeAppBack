import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import  GetARandomJokeController from "../controllers/GetARandomJokeController.js";
const jokesRouter = Router();

jokesRouter.get("/api/joke", ctrlWrapper(GetARandomJokeController));

export default jokesRouter;