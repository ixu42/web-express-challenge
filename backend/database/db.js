// PostgreSQL connection configuration
const { Pool } = require('pg')
const pool = new Pool({
    user: 'youruser',
    host: 'localhost',
    database: 'pokemon-db',
    password: 'yourpassword',
    port: 5432,
  })

module.exports = {
    query : (text, params) => pool.query(text, params),
}