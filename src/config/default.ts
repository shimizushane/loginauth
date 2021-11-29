import { readFileSync } from 'fs';

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
    cache: true,
  },
  mongoConfig: {
    dbUri: process.env.MONGO_URI,
  },
  PRIVATEKEY: readFileSync('key/private.key', 'utf-8'),
  PUBLICKEY: readFileSync('key/public.key', 'utf-8'),
  mailConfig: {
    mail_host: process.env.MAIL_HOST,
    mail_port: process.env.MAIL_PORT,
    mail_sender: process.env.MAIL_SENDER,
    mail_password: process.env.MAIL_PASS,
  },
});
