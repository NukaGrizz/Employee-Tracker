const db = require('../../db/connection');

// Delete a role
const deleteRole = (answers) => {
  const sql = `DELETE FROM roles WHERE title = ?`;
  const params = [answers.remRoleTitle];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      resolve(result);
      });
  });
};;

// Create a role
  const createRole = (answers) => {
  const sql = `INSERT INTO roles (title, salary, department_id)
  VALUES (?,?,?)`;
  const params = [answers.newRoleTitle, answers.newRoleSalary, answers.newRoleDepartmentId];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      resolve(result);
      });
  });
};

module.exports = { createRole , deleteRole };
