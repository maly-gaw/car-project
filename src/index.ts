import 'reflect-metadata';
import HttpServer from './server/server'
import { Logger } from 'tslog';
import CarController from './modules/car/car.controller';
import PingController from './modules/ping/ping.controller';
import { CarService } from './modules/car/car.service'

const logger: Logger = new Logger();

const server = new HttpServer(logger);
const service = new CarService(logger);

server.initializeControllers([
  new CarController(logger, service),
  new PingController()
])

server.start()
