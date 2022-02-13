require('dotenv').config();

module.exports = {
  "development": {
    "username": "z7Fg42k2j1",
    "password": "mjKjizEWD2",
    "database": "z7Fg42k2j1",
    "host": "remotemysql.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PRODUSER,
    "password": process.env.PRODPASSWORD,
    "database": process.env.PRODDATABASE,
    "host": process.env.PRODHOST,
    "dialect": "mysql"
  }
};