const express = require('express');
const { getTasks, createTask, getTaskById, updateTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);

module.exports = router;
