const inquirer = require('inquirer');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const httpReq = require('./routes/httpRequests')

var deptArr = [];
var rolArr = [];
var empArr =[];

const inputCheck = require('./utils/inputCheck');
const apiRoutes = require('./routes/apiRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

const loadData = () => {
        Promise.resolve(httpReq.getDepartments())
            .then(function(res) {
                return new Promise(function(resolve, reject) {
                    deptArr = res;
                    //console.log(deptArr);
                    resolve(deptArr);
                });
            }).then(function() {console.log(rolArr);console.log(deptArr);console.log(empArr);})
        Promise.resolve(httpReq.getRoles())
            .then(function(res) {
                return new Promise(function(resolve, reject) {
                    rolArr = res;
                    //console.log(rolArr);
                    resolve(rolArr);
                });
            }).then(function() {console.log(rolArr);console.log(deptArr);console.log(empArr);})
        Promise.resolve(httpReq.getEmployees())
            .then(function(res) {
                return new Promise(function(resolve, reject) {
                    empArr = res;
                    //console.log(empArr);
                    resolve(empArr);
                });
        })
        .then(function() {
            return new Promise(function(resolve, reject) {
            promptMenu()
            });     
})};

const promptMenu = () => {
    
    let departmentsArray = deptArr;
    let rolesArray = rolArr;
    let employeesArray = empArr;

    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Employee Tracker Main Menu',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Remove Department', 'Add Role', 'Remove Role', 'Add Employee', 'Update Employee Role', 'Update Employee Manager', 'Remove Employee']
      },
      {
        type: 'input',
        name: 'newDepartmentName',
        message: 'Enter the new Department Name. (Required)',
        when: (answers) => answers.action === 'Add Department',
        validate: newDepartmentNameInput => {
            if (newDepartmentNameInput) {
              return true;
            } else {
              console.log("Please enter the new Department Name!");
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'newDepartmentDescription',
        message: 'Enter the discription of the new Department. (Required)',
        when: (answers) => answers.action === 'Add Department',
        validate: newDepartmentDescriptionInput => {
            if (newDepartmentDescriptionInput) {
              return true;
            } else {
              console.log("Please enter the discription fo the new Department!");
              return false;
            }
          }
      },
      {
        type: 'list',
        name: 'remDepartmentName',
        message: 'Select the name for the Department to be Removed. (Required)',
        choices:departmentsArray.map(it => it.name),
        when: (answers) => answers.action === 'Remove Department',
        validate: remDepartmentNameInput => {
            if (remDepartmentNameInput) {
              return true;
            } else {
              console.log("Please enter the name for the Department to be Removed!");
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'newRoleTitle',
        message: 'Enter the Title of the new Role. (Required)',
        when: (answers) => answers.action === 'Add Role',
        validate: newRoleTitleInput => {
            if (newRoleTitleInput) {
              return true;
            } else {
              console.log("Please enter the Title of the new Role!");
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'newRoleSalary',
        message: 'Enter the salary of the Role to be added. (Required)',
        when: (answers) => answers.action === 'Add Role',
        validate: newRoleSalaryInput => {
            if (newRoleSalaryInput) {
              return true;
            } else {
              console.log("Please enter your Intern's school!");
              return false;
            }
          }
      },
      {
        type: 'list',
        name: 'newRoleDepartmentId',
        message: 'Select the Department for this new Role. (Required)',
        choices: departmentsArray.map(it => it.name),
        when: (answers) => answers.action === 'Add Role',
        validate: remDepartmentNameInput => {
            if (remDepartmentNameInput) {
              return true;
            } else {
              console.log("Select the Department for this new Role!");
              return false;
            }
        },
        filter: (answer) => {
            let result = departmentsArray.filter(it => it.name === answer).map(it => it.id)
            return result;
        }
      },
      {
        type: 'list',
        name: 'remRoleTitle',
        message: 'Select the name for the Department to be Removed. (Required)',
        choices: rolesArray.map(it => it.title),
        when: (answers) => answers.action === 'Remove Role',
        validate: remRoleTitleInput => {
            if (remRoleTitleInput) {
              return true;
            } else {
              console.log("Please enter the name for the Department to be Removed!");
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'newEmployeeFirstName',
        message: 'Enter the first name of the new Employee. (Required)',
        when: (answers) => answers.action === 'Add Employee',
        validate: newEmployeeNameInput => {
            if (newEmployeeNameInput) {
              return true;
            } else {
              console.log("Please enter the first name of the new Employee!");
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'newEmployeeLastName',
        message: 'Enter the last name of the new Employee. (Required)',
        when: (answers) => answers.action === 'Add Employee',
        validate: newEmployeeNameInput => {
            if (newEmployeeNameInput) {
              return true;
            } else {
              console.log("Please enter the last name of the new Employee!");
              return false;
            }
          }
      },
      {
        type: 'list',
        name: 'newEmployeeRole',
        message: 'Select the Role for this Employee. (Required)',
        choices: rolesArray.map(it => it.title),
        when: (answers) => answers.action === 'Add Employee',
        validate: newEmployeeRoleInput => {
            if (newEmployeeRoleInput) {
              return true;
            } else {
              console.log("Select the Role for this Employee!");
              return false;
            }
        },
        filter: (answer) => {
            let result = rolesArray.filter(it => it.title === answer).map(it => it.id)
            return result;
        }
      },
      {
        type: 'list',
        name: 'newEmployeeManager',
        message: 'Select the Manager for this Employee. (Required)',
        choices: employeesArray.map(it => it.last_name),
        when: (answers) => answers.action === 'Add Employee',
        filter: (answer) => {
            if (answer != null) {
            let result = employeesArray.filter(it => it.last_name === answer).map(it => it.id)
            return result;
            } else {
            return null;
            }
        }
      },
      {
        type: 'list',
        name: 'remEmployeeName',
        message: 'Select the last name of the Employee to be Removed. (Required)',
        choices: employeesArray.map(it => it.last_name),
        when: (answers) => answers.action === 'Remove Employee',
        validate: remEmployeeNameInput => {
            if (remEmployeeNameInput) {
              return true;
            } else {
              console.log("Please Select the last name of the Employee to be Removed!");
              return false;
            }
        }
      },
      {
        type: 'list',
        name: 'updateEmployeeManager',
        message: 'Select the Manager for this Employee. (Required)',
        choices: employeesArray.map(it => it.last_name),
        when: (answers) => answers.action === 'Update Employee Manager',
        filter: (answer) => {
            if (answer != null) {
            let result = employeesArray.filter(it => it.last_name === answer).map(it => it.id)
            return result;
            } else {
            return null;
            }
        }
      },
      {
        type: 'list',
        name: 'updateEmployeeRole',
        message: 'Select the Role for this Employee. (Required)',
        choices: rolesArray.map(it => it.title),
        when: (answers) => answers.action === 'Update Employee Role',
        filter: (answer) => {
            if (answer != null) {
            let result = rolesArray.filter(it => it.title === answer).map(it => it.id)
            return result;
            } else {
            return null;
            }
        }
      }
    ])
    .then(answers => {
        console.log(answers);
        return loadData();
    });
};

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
    loadData();
    });
