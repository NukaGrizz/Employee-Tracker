const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all employees
router.get('/employees', (req, res) => {
  const sql = `SELECT employees.*, roles.title AS Role, roles.salary AS Salary, department.name AS Department 
              FROM employees
              LEFT JOIN roles ON employees.role_id = roles.id
              LEFT JOIN department ON roles.department_id = department.id`;

  db.query(sql, (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message:'success',
          data: rows
      });
  });
});

//Get a single candidate
router.get('/employees/:id', (req, res) => {
  const sql = `SELECT employees.*, roles.title AS Role, roles.salary AS Salary, department.name AS Department
              FROM employees
              LEFT JOIN roles ON employees.role_id = roles.id
              LEFT JOIN department ON roles.department_id = department.id
              WHERE Employees.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
      if (err) {
          res.status(400).json({ error: err.message });
          return;
      }
      res.json({
          message: 'success',
          data: row
      });
  });
});

// Delete a employee
router.delete('/employees/:id', (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a employee
router.post('/employees', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
    });
  });
});

// Update a employee's role
router.put('/employees/role/:id', (req, res) => {
  const errors = inputCheck(req.body, 'role_id');
  if (errors) {
  res.status(400).json({ error: errors });
  return;
  }
  const sql = `UPDATE employees SET role_id = ? 
                WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Update a employee's manager
router.put('/employees/manager/:id', (req, res) => {
  const errors = inputCheck(req.body, 'manager_id');
  if (errors) {
  res.status(400).json({ error: errors });
  return;
  }
  const sql = `UPDATE employees SET manager_id = ? 
                WHERE id = ?`;
  const params = [req.body.manager_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

module.exports = router;