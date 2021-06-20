const mysql = require('mysql2')

const { envHOST, envUSER, envPASS, envNAME} = require('../helpers/env')

const conn = mysql.createConnection ({
  host: envHOST,
  user: envUSER,
  password: envPASS,
  database: envNAME
})

// conn.connect()

// conn.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err
//   console.log('The solution is: ', rows[0].solution)
// })

// conn.end()

module.exports = conn