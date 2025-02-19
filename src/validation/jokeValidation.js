import Joi from "joi";

export const updateVotesSchema = Joi.object({
  label:Joi.string().valid("🤣", "👍", "❤️")
});
