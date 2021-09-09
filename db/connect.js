const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection(
    {
        host:'localhost',
        // MySQL username,
        user:'root',
        // Your MySQL password
        password: '',
        database: 'employeetracker'
    },
    console.log('Connected to the employeetracker database.')
);

module.exports = db;