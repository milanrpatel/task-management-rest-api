const { TASK_REQUIRED_MESSAGE, ALLOWED_STATUSES } = require('../config/constants');
const { getAllTasks, createNewTask } = require('../services/taskService');
const { errorResponse, successResponse } = require('../utils/response');

const getTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
}

/**
 * Create a new task
 * @function createTask
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createTask = async (req, res) => {
    try {
        if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.trim() === '') {
            return res.status(400).json(errorResponse(TASK_REQUIRED_MESSAGE.title));
        }
        if (!req.body.description || typeof req.body.description !== 'string') {
            return res.status(400).json(errorResponse(TASK_REQUIRED_MESSAGE.description));
        }
        if (!req.body.status || !ALLOWED_STATUSES.includes(req.body.status)) {
            return res.status(400).json(errorResponse(TASK_REQUIRED_MESSAGE.status));
        }

        const data = req.body;
        const task = await createNewTask(data);

        res.status(201).json(successResponse(task));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
}

module.exports = {
    getTasks,
    createTask,
}