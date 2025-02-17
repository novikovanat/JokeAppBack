import axios from "axios";
import { RANDOM_JOKE_URL } from "../consts/consts.js";
import { JokesCollection } from "../db/models/joke.js";

export const getARandomJokeService = async () => {
  const response = await axios.get(RANDOM_JOKE_URL);
  return response.data;
};

export const saveAJokeService = async (question, answer) => {
  let joke = await JokesCollection.findOne({ question, answer });
  if (!joke) {
    joke = await JokesCollection.create({ question, answer });
  }
  return joke;
};

export const updateVotesService = async (id, payload) => {
  const updatedJoke = await JokesCollection.findByIdAndUpdate(
    id,
    { $push: { votes: { ...payload } } },
    { returnDocument: "after" }
  );
  return updatedJoke;
};
