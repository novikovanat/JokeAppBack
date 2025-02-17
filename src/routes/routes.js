import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getARandomJokeController,
  submitAVoteController,
} from "../controllers/jokesControllers.js";
import { isValidId } from "../middleware/isValidId.js";
import { validateBody } from "../middleware/validateBody.js";
import { updateVotesSchema } from "../validation/jokeValidation.js";
const jokesRouter = Router();

jokesRouter.get("/api/joke", ctrlWrapper(getARandomJokeController));

jokesRouter.post(
  "/api/joke/:id",
  isValidId,
  validateBody(updateVotesSchema),
  ctrlWrapper(submitAVoteController)
);

export default jokesRouter;
