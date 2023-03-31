import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tokosidia',
})

connection.connect(function (err) {
  if (err) {
    console.log('Failed create connection to database', new Error(err))
    process.exit()
  }
  console.log('Connected!')
})

export default connection
