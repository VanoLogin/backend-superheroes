import 'dotenv/config';
import pino from 'pino-http';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import superHeroesRouter from './routes/heroes.js';

import { initMongoConnection } from './db/initMongoConnection.js';

const PORT = process.env.PORT;

function setupServer() {
  initMongoConnection();

  const app = express();
  app.use(cookieParser());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });
  //   app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(superHeroesRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };
