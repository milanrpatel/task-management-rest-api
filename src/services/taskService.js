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

/**
 * Update a task by id service
 * @function updateTaskByID
 * @param {*} id 
 * @param {*} task 
 * @returns 
 */
const updateTaskByID = async (id, task) => {
    const updates = [];
    const values = [];
    let query = 'UPDATE tasks SET ';

    // build the query
    if (task.title) {
        updates.push('title = $' + (updates.length + 1));
        values.push(task.title);
    }
    if (task.description) {
        updates.push('description = $' + (updates.length + 1));
        values.push(task.description);
    }
    if (task.status) {
        updates.push('status = $' + (updates.length + 1));
        values.push(task.status);
    }

    if (updates.length === 0) {
        throw new Error('No valid fields to update');
    }

    // Append the updated fields and the condition
    query += updates.join(', ') + ', updated_at = CURRENT_TIMESTAMP WHERE id = $' + (updates.length + 1);
    values.push(id);

    const result = await db.query(`${query} RETURNING *`, values);

    return result.rows[0];
};

/**
 * Delete a task by id service
 * @function deleteTaskById
 * @param {*} id 
 * @returns 
 */
const deleteTaskById = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = $1';
    const { rowCount } = await db.query(query, [id]);
    return rowCount;
}

module.exports = {
    getAllTasks,
    createNewTask,
    getTaskDetailsById,
    updateTaskByID,
    deleteTaskById
}