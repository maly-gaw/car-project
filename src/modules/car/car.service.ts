import { Connection, getConnection, DeleteResult } from 'typeorm';
import { Cars } from '../../entity/Cars';
import { createCarDTO, updateCarDTO } from './car.schema';
import DBConnector from '../../db';
import { Logger } from 'tslog';

export class CarService {
  #dbConnection: DBConnector;
  #logger: Logger;

  constructor(logger: Logger) {
    this.#logger = logger;
    this.#dbConnection = new DBConnector(logger);
  }

  async getCar(id: string): Promise<Cars | unknown> {
    const connection = await this.connection()
    const repo = connection.getRepository(Cars);

    return await repo.findOne(id);
  }

  async getCars(): Promise<any> {
    const connection = await this.connection()
    const repo = connection.getRepository(Cars);

    return await repo.find();
  }

  async createCar(incomingData: createCarDTO): Promise<Cars | unknown> {
    const connection = await this.connection()

    try {
      const car = new Cars();
      car.name = incomingData.name;
      car.type = incomingData.type;
      car.colour = incomingData.colour;
      car.engine = incomingData.engine;
      car.hp = incomingData.hp;

      await connection.manager.save(car);
      return car;
    } catch (error) {
      this.#logger.error(`Cannot create car record...\nError: ${error}`);
    }
  }

  async updateCar(id: string, incomingData: updateCarDTO): Promise<Cars | unknown> {
    const connection = await this.connection()

    return await connection.transaction(async transactionalEntityManager => {
      const repo = transactionalEntityManager.getRepository(Cars);

      const carToUpdate = await repo.findOne(id);

      if (carToUpdate) {
        carToUpdate.hp = incomingData.hp;
        await transactionalEntityManager.save(carToUpdate);
        return carToUpdate;
      }
    });
  }

  async deleteCar(id: string): Promise<DeleteResult> {
    const connection = await this.connection()

    return await connection
      .createQueryBuilder()
      .delete()
      .from(Cars)
      .where("id = :id", { id })
      .execute();
  }

  private async connection(): Promise<Connection> {
    let connection: Connection;
    try {
      connection = getConnection();
    } catch (error) {
      this.#logger.error(error);
      await this.#dbConnection.connect()
      connection = getConnection()
    }
    return connection;
  }
}
