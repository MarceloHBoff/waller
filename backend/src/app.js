import './bootstrap';

import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import Youch from 'youch';
import 'express-async-errors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
    this.server.use(errors());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const error = await new Youch(err, req).toJSON();

        return res.status(500).json(error);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
