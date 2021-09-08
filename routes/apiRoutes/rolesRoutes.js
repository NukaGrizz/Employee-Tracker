const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

const getRoles = (req, res) => {
  const sql = `SELECT * FROM roles`;

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
}


// Get all roles
router.get('/roles', (req, res) => {
  getRoles(req, res);
});

// Delete a role
router.delete('/roles/:id', (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
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

// Create a role
router.post('/roles', ({ body }, res) => {
  const errors = inputCheck(body, 'title', 'salary', 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO roles (title, salary, department_id)
  VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department];

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

module.exports = router;
