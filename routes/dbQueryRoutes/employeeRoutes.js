const db = require('../../db/connection');


// // Get all employees
// router.get('/employees', (req, res) => {
//   const sql = `SELECT employees.*, roles.title AS Role, roles.salary AS Salary, department.name AS Department 
//               FROM employees
//               LEFT JOIN roles ON employees.role_id = roles.id
//               LEFT JOIN department ON roles.department_id = department.id`;

//   db.query(sql, (err, rows) => {
//       if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//       }
//       res.json({
//           message:'success',
//           data: rows
//       });
//   });
// });

// //Get a single candidate
// router.get('/employees/:id', (req, res) => {
//   const sql = `SELECT employees.*, roles.title AS Role, roles.salary AS Salary, department.name AS Department
//               FROM employees
//               LEFT JOIN roles ON employees.role_id = roles.id
//               LEFT JOIN department ON roles.department_id = department.id
//               WHERE Employees.id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, row) => {
//       if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//       }
//       res.json({
//           message: 'success',
//           data: row
//       });
//   });
// });

// Delete a employee
const deleteEmployee = (answers) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [answers.remEmployeeId];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      resolve(result);
      });
  });
};

// Create a employee
const createEmployee = (answers) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
  const params = [answers.newEmployeeFirstName, answers.newEmployeeLastName, answers.newEmployeeRole, answers.newEmployeeManager];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      resolve(result);
      });
  });
};

// Update a employee's role
const updateEmpRole = (answers) => {
  const sql = `UPDATE employees SET role_id = ? 
                WHERE id = ?`;
  const params = [answers.empRoleNew, answers.empTobeUpdated];
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      resolve(result);
      });
  });
};

// Update a employee's manager
const updateEmpManager = (answers) => {
  const sql = `UPDATE employees SET manager_id = ? 
                WHERE id = ?`;
  const params = [answers.updateEmployeeManager, answers.empTobeUpdated];
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      resolve(result);
      });
  });
};

module.exports = { createEmployee , deleteEmployee , updateEmpRole, updateEmpManager };