const pool = require('../models/connection')

exports.getAllBooks = (req, res) => {
  // res.send("asdf")
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err)
      // Handle the error
      return
    }
    let queryString = ''
    const { language, sort } = req.query
    console.log(sort)
    if (req.query.hasOwnProperty('language') && language !== undefined) {
      queryString = queryString.concat(`where language = "${language}" `)
      console.log(queryString)
    }
    if (req.query.hasOwnProperty('sort') && sort !== undefined) {
      queryString = queryString.concat(
        `order by ${sort.split('-')[0]} ${sort.split('-')[1]} `,
      )
      console.log(queryString)
    }

    connection.query(
      `SELECT * FROM books ${queryString} LIMIT 10 OFFSET ${
        req.query.pageNumber * 10 - 10
      }`,
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
