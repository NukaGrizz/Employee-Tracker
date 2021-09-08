const express = require('express');
const router = express.Router();

router.use(require('./employeeRoutes.js'));
router.use(require('./departmentRoutes.js'));
router.use(require('./rolesRoutes.js'));

module.exports = router;