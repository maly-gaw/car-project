import express from 'express';
import { IController } from '../interfaces/controller';
import { Logger } from 'tslog';
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';

const log: Logger = new Logger();

export default class HttpServer {
  #app: express.Application;
  #log: Logger;

  constructor(logger: Logger) {
    this.#log = logger;
    this.#log.info('Server environment: development');
    this.#app = express();
    this.#app.use(bodyParser.json());
    morganBody(this.#app);
    this.#log.info('Server setup done');
  }

  public initializeControllers = (controllers: IController[]): void => {
    controllers.forEach((controller) => {
      this.#app.use('/', controller.router);
    });
    this.#log.info('Endpoints setup done');
  }

  public start = (): void => {
    this.#log.info('Starting server...');
    this.#app.listen(3000, () => {
      this.#log.info('Car configuration http server is listening on port 3000');
    });
  }
}

