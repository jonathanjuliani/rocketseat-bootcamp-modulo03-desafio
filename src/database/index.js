import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../configs/database';

import User from '../app/models/User';
import MeetApps from '../app/models/MeetApps';
import File from '../app/models/File';
import Subscription from '../app/models/Subscription';

const models = [User, MeetApps, File, Subscription];

class Database {
  constructor() {
    this.init();
    this.mongo();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }

  mongo() {
    const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;
    const mongoURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

    this.mongoConnection = mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }

  associate() {
    models.forEach(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
