const db = require('../../db/connection'); 

// Delete a departments
const deleteDepartment = (answers) => {
  const sql = `DELETE FROM department WHERE name = ?`;
  const params = [answers.remDepartmentName];

  return new Promise((resolve, reject) => {
  db.query(sql, params, (err, result) => {
    if (err) reject(err)
      resolve(result);
      });
  });
};

// Create a department
const createDepartment = (answers) => {
  const sql = `INSERT INTO department (name, description)
  VALUES (?,?)`;
  const params = [answers.newDepartmentName, answers.newDepartmentDescription];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      resolve(result);
      });
  });
};


module.exports = { createDepartment , deleteDepartment };
