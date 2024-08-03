const express = require('express');
const { getTasks, createTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',authenticateToken, getTasks);
router.get('/:id',authenticateToken, getTaskById);
router.post('/',authenticateToken, createTask);
router.put('/:id',authenticateToken, updateTask);
router.delete('/:id',authenticateToken, deleteTask);

module.exports = router;
