const express = require('express');
const { getTasks, createTask, getTaskById } = require('../controllers/taskController');

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);

module.exports = router;
