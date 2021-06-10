import { createConnection, Connection } from 'typeorm';
import { Cars } from './entity/Cars';
import { Logger } from "tslog";

export default class DBConnector {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
    this.logger.info('Created instance of DBConnector...');
  }
  connect = async (): Promise<Connection> => {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "cardb",
      synchronize: true,
      logging: false,
      entities: [
        Cars
      ]
    });
    return connection;
  }
}
