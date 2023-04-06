const Pool = require('pg').Pool

const pool = new Pool({
    user: 'tnluser',
    host: 'localhost',
    database: 'gradeup',
    password:'postgres',
    port: 5432,
})

module.exports = pool;