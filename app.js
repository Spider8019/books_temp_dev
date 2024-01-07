const express = require('express')
const app = express()
const cors = require('cors')
const { booksRouter, bookRoute } = require('./routes')
const authMiddleware = require('./middlewares/auth')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/novels', authMiddleware, booksRouter)
app.use('/novel', bookRoute)

// app.get('/novel/:title', async (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to MySQL database: ', err)
//       // Handle the error
//       return
//     }

//     connection.query(
//       `SELECT * FROM books WHERE title like "%${req.params.title}%"`,
//       (err, results) => {
//         if (err) {
//           console.error('Error executing query: ', err)
//           return res.status(500).json({
//             error: 'Internal Server Error',
//             message: err.message,
//           })
//         } else if (results.length == 0)
//           return res.status(404).json({
//             error: 'Not found',
//           })
//         res.send(results)
//       },
//     )

//     // Use the connection for executing queries
//     console.log('connected')

//     // Release the connection when finished
//     connection.release()
//   })
// })

// app.post('/createcustomer/', async (req, res) => {
//   console.log('request arrived', req.body)
//   const regexPattern = /^91\d{10}@c\.us$/
//   if (regexPattern.test(req.body.phonenumber)) {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error('Error connecting to MySQL database: ', err)
//         return
//       }

//       connection.query(
//         `insert into users (wallet_balance, name, phonenumber) values (0,"","${req.body.phonenumber}")`,
//         (err, results) => {
//           if (err) {
//             console.error('Error executing query: ', err)
//             return res.status(500).json({
//               error: 'Internal Server Error',
//               message: err.message,
//             })
//           }
//           res.send(results)
//         },
//       )
//       console.log('connected')

//       // Release the connection when finished
//       connection.release()
//     })
//   }
// })

// app.get('/userdetail/:phonenumber', async (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to MySQL database: ', err)
//       // Handle the error
//       return
//     }

//     connection.query(
//       `SELECT * FROM users WHERE phonenumber = "${req.params.phonenumber}"`,
//       (err, results) => {
//         if (err) {
//           console.error('Error executing query: ', err)
//           return res.status(500).json({
//             error: 'Internal Server Error',
//             message: err.message,
//           })
//         }
//         res.send(results)
//       },
//     )

//     // Use the connection for executing queries
//     console.log('connected')

//     // Release the connection when finished
//     connection.release()
//   })
// })

app.listen(PORT, () => [console.log('server started running ' + PORT)])
