const inquirer = require('inquirer');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require(`./db/connection`);


//const inputCheck = require('./utils/inputCheck');
const apiRoutes = require('./routes/apiRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your Managers name? (Required)',
        validate: managerInput => {
          if (managerInput) {
            return true;
          } else {
            console.log('Please enter your Managers name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter your Managers employee ID. (Required)',
        validate: idInput => {
          if (idInput) {
            return true;
          } else {
            console.log('Please enter your Managers employee ID!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Please enter your Managers email.',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter your Managers email!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter your Managers Office Number.',
        validate: officeNumberInput => {
          if (officeNumberInput) {
            return true;
          } else {
            console.log('Please enter your Managers Office Number!');
            return false;
          }
        }
      }
    ]);
  };

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    promptUser();
});
