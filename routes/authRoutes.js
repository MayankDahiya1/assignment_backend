/*
 * CONST ASSIGNMENT
 */
const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

/*
 * ROUTER DEFINE
 */
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

/*
 * EXPORT
 */
module.exports = router;
