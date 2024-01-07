const pool = require('../models/connection')

exports.getABook = (req, res) => {
  // res.send("asdf")
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err)
      // Handle the error
      return
    }

    connection.query(
      `SELECT * FROM books WHERE book_id=${req.query.book_id}`,
      (err, results) => {
        if (err) {
          console.error('Error executing query: ', err)
          return
        }
        console.log(results.length)
        res.send(results)
      },
    )

    // Use the connection for executing queries
    console.log('connected')

    // Release the connection when finished
    connection.release()
  })
}
