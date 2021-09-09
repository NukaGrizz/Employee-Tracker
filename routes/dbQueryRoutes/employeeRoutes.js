const db = require('../../db/connect');

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