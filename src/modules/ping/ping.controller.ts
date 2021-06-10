import { Request, Response, Router } from 'express';
import { IController } from '../../interfaces/controller';
import HTTPStatus from 'http-status';

class PingController implements IController {
  public path = '/api/v1/ping';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(`${this.path}`, [this.ping]);
  }

  ping = async (request: Request, response: Response): Response => {
    return response.status(HTTPStatus.OK).json('Server is up and running');
  };
}

export default PingController;
