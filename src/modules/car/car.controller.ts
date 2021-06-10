import { Request, Response, Router } from 'express';
import { IController } from '../../interfaces/controller';
import { Logger } from "tslog";
import HTTPStatus from 'http-status';
import { paramIdSchema, createCarSchema, createCarDTO, paramIdDTO, updateCarDTO, updateCarSchema } from './car.schema';
import { CarService } from './car.service'

class CarController implements IController {
  #logger: Logger;
  #service: CarService;

  public path = '/api/v1/car-configuration';
  public router = Router();

  constructor(logger: Logger, service: CarService) {
    this.#logger = logger;
    this.#service = service;
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(`${this.path}/:id?`, [this.getCars]);
    this.router.patch(`${this.path}/:id`, [this.updateCar]);
    this.router.post(`${this.path}`, [this.createCar]);
    this.router.delete(`${this.path}/:id`, [this.deleteCar]);
  }

  getCars = async (request: Request, response: Response): Response => {
    this.#logger.info('Get car');
    let cars: createCarDTO | unknown;
    const carId: paramIdDTO = { id: request.params.id };
    if (carId.id) {
      try {
        paramIdSchema.parse(carId);
        cars = await this.#service.getCar(carId.id);
      } catch (error) {
        this.#logger.fatal(error);
        return response.status(HTTPStatus.BAD_REQUEST).json({ error: error.message });
      }
    } else {
      cars = await this.#service.getCars();
    }
    return response.status(HTTPStatus.OK).json(cars);
  };

  updateCar = async (request: Request, response: Response): Response => {
    this.#logger.info('Update car');
    const carId: paramIdDTO = { id: request.params.id };

    try {
      paramIdSchema.parse(carId);
      const incomingData: updateCarDTO = updateCarSchema.parse(request.body)
      const cars = await this.#service.updateCar(carId.id, incomingData);
      return response.status(HTTPStatus.OK).json(cars);
    } catch (error) {
      this.#logger.fatal(error);
      return response.status(HTTPStatus.BAD_REQUEST).json({ error: error.message });
    }
  };

  createCar = async (request: Request, response: Response): Response => {
    this.#logger.info('Create car');
    try {
      const incomingData: createCarDTO = createCarSchema.parse(request.body);
      const cars = await this.#service.createCar(incomingData);
      return response.status(HTTPStatus.OK).json(cars);
    } catch (error) {
      this.#logger.fatal(error);
      return response.status(HTTPStatus.BAD_REQUEST).json({ error: error.message });
    }
  };

  deleteCar = async (request: Request, response: Response): Response => {
    this.#logger.info('Delete car');
    const carId: paramIdDTO = { id: request.params.id };

    try {
      paramIdSchema.parse(carId);
      const carDeleted = await this.#service.deleteCar(carId.id);
      return response.status(HTTPStatus.OK).json(carDeleted);
    } catch (error) {
      return response.status(HTTPStatus.BAD_REQUEST).json({ error: error.message });
    }
  };
}

export default CarController;
