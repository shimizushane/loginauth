export default () => ({
  PORT: process.env.PORT,
  mysqlConfig: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ['dist/**/entities/*.entity.{ts,js}'],
    synchronize: true,
  },
  mongoConfig: {
    dbUri: process.env.MONGO_URI,
  },
});
