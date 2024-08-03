const express = require('express');
const { getTasks, createTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
