import express from "express";
import pino from "pino-http";
import cors from "cors";
import dotenv from "dotenv";
import env from "./utils/env.js";
import jokesRouter from "./routes/routes.js";
import { notFoundHandler} from "./middleware/errorHandlers.js";
import createHttpError from "http-errors";

dotenv.config();
const PORT = Number(env("PORT"));

export const setupServer = () => {
  const app = express();
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.use(express.json());
  app.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "https://joke-app-front.vercel.app",
          "https://jokeappback.onrender.com",
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(createHttpError("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use("/", jokesRouter);
  app.use("*", notFoundHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
