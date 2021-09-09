export default {
  mysqlConfig: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'test',
    entities: [],
    synchronize: true,
  },
  mongoConfig: {
    dbUri: 'mongodb://localhost:27017/local',
  },
};
