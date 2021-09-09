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
    const sql = `SELECT employees.*, roles.title AS Role, roles.salary AS Salary, department.name AS Department 
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id`;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
        if (err) reject(err)
        
        let content = rows;
        resolve(content);
        });
    });
};

module.exports = { getDepartments , getRoles, getEmployees };
