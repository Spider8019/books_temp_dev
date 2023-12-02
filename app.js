const mysql = require('mysql2')
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000
const pool = mysql.createPool({
  host: 'bxvdqypaoapk8gq6b7vt-mysql.services.clever-cloud.com',
  user: 'utwqxdx7kw0luqml',
  password: 'utwqxdx7kw0luqml',
  database: 'bxvdqypaoapk8gq6b7vt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  console.log(req.query)
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err)
      // Handle the error
      return
    }

    connection.query(`SELECT * FROM BOOK`, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err)
        return
      }

      res.send(results)
    })

    // Use the connection for executing queries
    console.log('connected')

    // Release the connection when finished
    connection.release()
  })
})

app.listen(PORT, () => [console.log('server started running')])
