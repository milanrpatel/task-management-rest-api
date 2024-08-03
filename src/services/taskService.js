const db = require('../config/db');

/**
 * Get all tasks with pagination service
 * @function getAllTasks
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
const getAllTasks = async (page = 1, limit = 10) => {

    const offset = (page - 1) * limit;

    const countQuery = 'SELECT COUNT(*) AS total_count FROM tasks';
    const countResult = await db.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].total_count, 10);

    const query = 'SELECT * FROM tasks LIMIT $1 OFFSET $2';
    const values = [limit, offset];
    const { rows } = await db.query(query, values);

    return { tasks: rows, totalCount };
};

/**
 * Create a new task service
 * @function createNewTask
 * @param {*} task 
 * @returns 
 */
const createNewTask = async (task) => {
    const { title, description, status } = task;
    const result = await db.query(
        'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
        [title, description, status]
    );
    return result.rows[0];
};

/**
 * Get a task by id service
 * @function getTaskDetailsById
 * @param {*} id 
 * @returns 
 */
const getTaskDetailsById = async (id) => {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

module.exports = {
    getAllTasks,
    createNewTask,
    getTaskDetailsById,
}