const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'bxvdqypaoapk8gq6b7vt-mysql.services.clever-cloud.com',
  user: 'utwqxdx7kw0luqml',
  password: 'IRlFnyz2wjQbHsclRetn',
  database: 'bxvdqypaoapk8gq6b7vt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // host: 'localhost',
  // user: 'root',
  // password: 'Aman@123',
  // database: 'books_temp',
})

module.exports = pool
