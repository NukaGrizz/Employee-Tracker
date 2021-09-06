const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
//const inputCheck = require('./utils/inputCheck');
//const apiRoutes = require('./routes/apiRoutes');
const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection(
    {
        host:'localhost',
        // MySQL username,
        user:'root',
        // Your MySQL password
        password: 'Bondage6969',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
