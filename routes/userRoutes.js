/*
 * CONST ASSIGNMENT
 */
const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

/*
 * ROUTER DEFINE
 */
router.get('/', auth, adminAuth, getUsers);
router.post('/', auth, adminAuth, createUser);
router.put('/:id', auth, adminAuth, updateUser);
router.delete('/:id', auth, adminAuth, deleteUser);

/*
 * EXPORT
 */
module.exports = router;
