const inquirer = require('inquirer');
const cTable = require('console.table')
const dbQuery = require('./routes/dbQueryRoutes/menuArrDataRoutes')
const deptRoutes = require('./routes/dbQueryRoutes/departmentRoutes')
const rolRoutes = require('./routes/dbQueryRoutes/rolesRoutes');
const empRoutes = require('./routes/dbQueryRoutes/employeeRoutes');

// Define Arrs to be filled by Load data for the menu to render
var deptArr = [];
var rolArr = [];
var empArr =[];

// Gets the data in the database to be renderned in the menu and user requests
const loadData = () => {
        Promise.resolve(dbQuery.getDepartments())
            .then(function(res) {
                return new Promise(function(resolve, reject) {
                    deptArr = res;
                    //console.log(deptArr);
                    resolve(deptArr);
                });
            })//.then(function() {console.log(rolArr);console.log(deptArr);console.log(empArr);})
        Promise.resolve(dbQuery.getRoles())
            .then(function(res) {
                return new Promise(function(resolve, reject) {
                    rolArr = res;
                    //console.log(rolArr);
                    resolve(rolArr);
                });
            })//.then(function() {console.log(rolArr);console.log(deptArr);console.log(empArr);})
        Promise.resolve(dbQuery.getEmployees())
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

// Runs the inquirer in the console and then calls functions to render info or push any data changes to database based on user input
const promptMenu = () => {
    let departmentsArray = deptArr;
    let rolesArray = rolArr;
    let employeesArray = empArr;
    let employeesArrayMgr = employeesArray.map(it => (it.first_name + ' ' + it.last_name));
    employeesArrayMgr.push('null');
    
    //inquirer that runsthe menu and options foir the user
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
        message: 'Enter the new Department Name.',
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
        message: 'Enter the discription of the new Department.',
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
        message: 'Select the name of the Department to be Removed. (Required)',
        choices:departmentsArray.map(it => it.name),
        when: (answers) => answers.action === 'Remove Department',
        validate: remDepartmentNameInput => {
            if (remDepartmentNameInput) {
              return true;
            } else {
              console.log("Please enter the name of the Department to be Removed!");
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'newRoleTitle',
        message: 'Enter the Job Title of the new Role. (Required)',
        when: (answers) => answers.action === 'Add Role',
        validate: newRoleTitleInput => {
            if (newRoleTitleInput) {
              return true;
            } else {
              console.log("Please enter the Job Title of the new Role!");
              return false;
            }
          }
      },
      {
        type: 'number',
        name: 'newRoleSalary',
        message: 'Enter the salary of the new Role. (Required)',
        when: (answers) => answers.action === 'Add Role'
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
        message: 'Select the name of the Department to be Removed. (Required)',
        choices: rolesArray.map(it => it.title),
        when: (answers) => answers.action === 'Remove Role',
        validate: remRoleTitleInput => {
            if (remRoleTitleInput) {
              return true;
            } else {
              console.log("Select the name of the Department to be Removed!");
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
        choices: employeesArrayMgr,
        when: (answers) => answers.action === 'Add Employee',
        filter: (answer) => {
            if (answer !='null') {
            let result = employeesArray.filter(it => (it.first_name + ' ' + it.last_name) === answer).map(it => it.id)
            return result;
            } else {
            return null;
            }
        }
      },
      {
        type: 'list',
        name: 'remEmployeeId',
        message: 'Select the last name of the Employee to be Removed. (Required)',
        choices: employeesArray.map(it => (it.first_name + ' ' + it.last_name)),
        when: (answers) => answers.action === 'Remove Employee',
        filter: (answer) => {
            if (answer != null) {
            let result = employeesArray.filter(it => (it.first_name + ' ' + it.last_name) === answer).map(it => it.id)
            return result;
            } else {
            return null;
            }
        }
      },
      {
        type: 'list',
        name: 'empTobeUpdated',
        message: 'Select the Name of the Employee to be updated. (Required)',
        choices: employeesArray.map(it => (it.first_name + ' ' + it.last_name)),
        when: (answers) => answers.action === 'Update Employee Role'|| answers.action === 'Update Employee Manager',
        filter: (answer) => {
            if (answer != null) {
            let result = employeesArray.filter(it => (it.first_name + ' ' + it.last_name) === answer).map(it => it.id)
            return result;
            } else {
            return null;
            }
        }
      },
      {
        type: 'list',
        name: 'updateEmployeeManager',
        message: 'Select the new Manager for this Employee. (Required)',
        choices: employeesArrayMgr,
        when: (answers) => answers.action === 'Update Employee Manager',
        filter: (answer) => {
            if (answer != 'null') {
            let result = employeesArray.filter(it => (it.first_name + ' ' + it.last_name) === answer).map(it => it.id)
            return result;
            } else {
            return null;
            }
        }
      },
      {
        type: 'list',
        name: 'empRoleNew',
        message: 'Select the new Role for this Employee. (Required)',
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
        //switch function to decide what to do based on user selection
        switch(answers.action){
            case 'View All Departments':
                let depTable = cTable.getTable(deptArr);
                console.log(depTable);
                break;
            case 'View All Roles':
                let rolTable = cTable.getTable(rolArr);
                console.log(rolTable);
                break;
            case 'View All Employees':
                let empTable = cTable.getTable(empArr);
                console.log(empTable);
                break;
            case 'Add Department':
                deptRoutes.createDepartment(answers);
                break;
            case 'Remove Department':
                deptRoutes.deleteDepartment(answers);
                break;
            case 'Add Role':
                rolRoutes.createRole(answers);
                break;
            case 'Remove Role':
                rolRoutes.deleteRole(answers);
                break;
            case 'Add Employee':
                empRoutes.createEmployee(answers);
                break;
            case 'Update Employee Role':
                empRoutes.updateEmpRole(answers);
                break;
            case 'Update Employee Manager':
                empRoutes.updateEmpManager(answers);
                break;
            case 'Remove Employee':
                empRoutes.deleteEmployee(answers);
                break;
        }
        return loadData();
    });
};


    console.log('______________________________________________________________________');
    console.log('|                                                                      |');
    console.log('|   ____   ___    ___   ____    _        _____   __   __  ____   ____  |');
    console.log('|  |  __| |   \\  /   | |  _ \\  | |      /  _  \\  \\ \\ / / |  __| |  __| |');
    console.log('|  | |__  | |\\ \\/ /| | | |_| | | |      | | | |   \\   /  | |__  | |__  |');
    console.log('|  |  __| | | \\  / | | |  __/  | |      | | | |    | |   |  __| |  __| |');
    console.log('|  | |__  | |  \\/  | | | |     | |___   | |_| |    | |   | |__  | |__  |');
    console.log('|  |____| |_|      |_| |_|     |_____|  \\_____/    |_|   |____| |____| |');
    console.log('|   ___    ___     _____    _____                                      |');
    console.log('|  |   \\  /   |   / ____|  |  __ \\                                     |');
    console.log('|  | |\\ \\/ /| |  | |  ___  | |__| |                                    |');
    console.log('|  | | \\  / | |  | | |_  | |     /                                     |');
    console.log('|  | |  \\/  | |  | |___| | | |\\ \\                                      |');
    console.log('|  |_|      |_|   \\_____/  |_| \\_\\                                     |');
    console.log('|______________________________________________________________________|');
    console.log('By NukaGrizz')
    loadData();
