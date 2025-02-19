import createHttpError from "http-errors";
import {
  getARandomJokeService,
  saveAJokeService,
  updateVotesService,
} from "../services/jokeServices.js";
import { VALUES } from "../consts/consts.js";
export const getARandomJokeController = async (req, res, next) => {
  const externalJoke = await getARandomJokeService();
  if (!externalJoke) {
    next(createHttpError(502, "Joke cannot be fetched"));
    return;
  }
  const { question, answer } = externalJoke;
  const data = await saveAJokeService(question, answer);
  if (!data) {
    next(createHttpError(503, "Please try again later"));
    return;
  }
  res.json({
    status: 200,
    message: "Joke fetched successfully",
    data,
  });
};

export const submitAVoteController = async (req, res, next) => {
  const { id } = req.params;
  const updateObj = {value:VALUES[req.body.label], ...req.body};
  const data = await updateVotesService(id, updateObj);
  if (!data) {
    next(createHttpError(404, `There is no joke with id: ${id}`));
    return;
  }
  res.json({
    status: 200,
    message: "Your vote counted",
    data,
  });
};
