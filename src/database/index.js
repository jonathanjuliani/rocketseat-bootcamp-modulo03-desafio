import Sequelize from 'sequelize';

import databaseConfig from '../configs/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }

  mongo() {}
}

export default new Database();
