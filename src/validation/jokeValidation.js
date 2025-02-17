import Joi from "joi";

export const updateVotesSchema = Joi.object().valid(
  { label: "🤣", value: 10 },
  { label: "👍", value: 5 },
  { label: "❤️", value: 3 }
)