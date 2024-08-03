const { TASK_REQUIRED_MESSAGE, ALLOWED_STATUSES, ERROR_PAGINATION, ERROR_TASK_NOT_FOUND } = require('../config/constants');
const { getAllTasks, createNewTask, getTaskDetailsById } = require('../services/taskService');
const { errorResponse, successResponse } = require('../utils/response');

/**
 * Get all tasks with pagination
 * @function getTasks
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getTasks = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;
        const page = parseInt(req.query.page, 10) || 1;

        if (limit <= 0 || page < 0) {
            return res.status(400).json(errorResponse(ERROR_PAGINATION));
        }

        const tasks = await getAllTasks(page, limit);

        res.status(200).json(successResponse(tasks));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
}

/**
 * Get a task by id
 * @function getTaskById
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getTaskById = async (req, res) => {
    try {
        const task = await getTaskDetailsById(req.params.id);
        if (!task) {
            return res.status(404).json(errorResponse(`${ERROR_TASK_NOT_FOUND} with id ${req.params.id}`));
        }
        res.status(200).json(successResponse(task));
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
    getTaskById,
}