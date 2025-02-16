import { model, Schema } from "mongoose";

const jokeSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    votes: {
      type: Array,
      default: [
        { value: 10, label: "🤣" },
        { value: 5, label: "👍" },
        { value: 3, label: "❤️" },
      ],
    },
    availableVotes: { type: Array, default: ["🤣", "👍", "❤️"] },
  },
  { versionKey: false }
);

export const JokesCollection = model("jokes", jokeSchema);
