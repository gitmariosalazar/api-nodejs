import {config} from 'dotenv';
import pkg from 'pg';
import fs from 'fs'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {Pool} = pkg;

config()

const getConnectionA = new Pool({
  host: process.env.POSTGRESQL_ADDON_HOST_AZURE,
  user: process.env.POSTGRESQL_ADDON_USER_AZURE,
  database: process.env.POSTGRESQL_ADDON_DB_AZURE,
  password: process.env.POSTGRESQL_ADDON_PASSWORD_AZURE,
  port: process.env.POSTGRESQL_ADDON_PORT_AZURE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    ca: fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem', 'utf-8')
  }
})

const getConnection = new Pool({
  host: process.env.POSTGRESQL_ADDON_HOST,
  user: process.env.POSTGRESQL_ADDON_USER,
  database: process.env.POSTGRESQL_ADDON_DB,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  port: process.env.POSTGRESQL_ADDON_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const getConnectionOffline = new Pool({
  host: process.env.HOST_LOCAL,
  user: process.env.USER_LOCAL,
  database: process.env.DB_LOCAL,
  password: process.env.PASSWORD_LOCAL,
  port: process.env.PORT_LOCAL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

//console.log(getConnectionOnline)

export {
  getConnection
}