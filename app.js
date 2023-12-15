const mysql = require('mysql2')
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000
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

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/novels', async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err)
      // Handle the error
      return
    }

    connection.query(
      `SELECT * FROM books LIMIT 10 OFFSET ${req.query.pageNumber * 10 - 10}`,
      (err, results) => {
        if (err) {
          console.error('Error executing query: ', err)
          return
        }
        console.log(results.length)
        res.json(results)
      },
    )

    // Use the connection for executing queries
    console.log('connected')

    // Release the connection when finished
    connection.release()
  })
})

app.get('/novel/:title', async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err)
      // Handle the error
      return
    }

    connection.query(
      `SELECT * FROM books WHERE title like "%${req.params.title}%"`,
      (err, results) => {
        if (err) {
          console.error('Error executing query: ', err)
          return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message,
          })
        } else if (results.length == 0)
          return res.status(404).json({
            error: 'Not found',
          })
        res.send(results)
      },
    )

    // Use the connection for executing queries
    console.log('connected')

    // Release the connection when finished
    connection.release()
  })
})

app.post('/createcustomer/', async (req, res) => {
  console.log('request arrived', req.body)
  const regexPattern = /^91\d{10}@c\.us$/
  if (regexPattern.test(req.body.phonenumber)) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL database: ', err)
        return
      }

      connection.query(
        `insert into users (wallet_balance, name, phonenumber) values (0,"","${req.body.phonenumber}")`,
        (err, results) => {
          if (err) {
            console.error('Error executing query: ', err)
            return res.status(500).json({
              error: 'Internal Server Error',
              message: err.message,
            })
          }
          res.send(results)
        },
      )
      console.log('connected')

      // Release the connection when finished
      connection.release()
    })
  }
})

app.get('/userdetail/:phonenumber', async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err)
      // Handle the error
      return
    }

    connection.query(
      `SELECT * FROM users WHERE phonenumber = "${req.params.phonenumber}"`,
      (err, results) => {
        if (err) {
          console.error('Error executing query: ', err)
          return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message,
          })
        }
        res.send(results)
      },
    )

    // Use the connection for executing queries
    console.log('connected')

    // Release the connection when finished
    connection.release()
  })
})

app.listen(PORT, () => [console.log('server started running')])
