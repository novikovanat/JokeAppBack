import createHttpError from "http-errors";
import {
  getARandomJokeService,
  saveAJokeService,
} from "../services/jokeServices.js";
export default async function GetARandomJokeController(req, res, next) {
  const externalJoke = await getARandomJokeService();
  if (!externalJoke) {
    next(createHttpError(502, "Joke cannot be fetched"));
    return;
  }
  const { question, answer } = externalJoke;
  const joke = await saveAJokeService(question, answer);

  res.json({
    status: 200,
    message: "Joke fetched successfully",
    joke,
  });
}
