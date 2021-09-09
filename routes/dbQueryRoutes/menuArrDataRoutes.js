const express = require("express");
const db = require('../../db/connection');
//const inputCheck = require('../utils/inputCheck');

const getDepartments = () => {
    const sql = `SELECT * FROM department`;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
        if (err) reject(err)
        
        let content = rows;
        resolve(content);
        });
    });
};

const getRoles = () => {
    const sql = `SELECT roles.*, department.name AS Department
                 FROM roles
                 LEFT JOIN department ON roles.department_id = department.id `;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
        if (err) reject(err)
        
        let content = rows;
        resolve(content);
        });
    });
};

const getEmployees = () => {
    const sql = `SELECT e.*, roles.title AS Role, roles.salary AS Salary, department.name AS Department, CONCAT(m.first_name, ',', m.last_name) AS Manager 
                FROM employees e
                LEFT JOIN roles ON e.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employees m ON e.manager_id = m.id`;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
        if (err) reject(err)
        
        let content = rows;
        resolve(content);
        });
    });
};

module.exports = { getDepartments , getRoles, getEmployees };