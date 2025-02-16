import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import  env  from './utils/env.js';
import  jokesRouter  from './routes/routes.js';
import { notFoundHandler, ErrorHandler } from './middleware/errorHandlers.js';


dotenv.config();
const PORT = Number(env('PORT'));

export const setupServer = () => {
  const app = express();
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(express.json());
  app.use(cors());
  app.use('/', jokesRouter);
  app.use('*', notFoundHandler);

  app.use(ErrorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  
};
