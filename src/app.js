import 'dotenv/config';
import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
        return res.status(500).json({
          error:
            'Ocorreu um erro ao processar a requisição, contate o administrador.',
        });
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
