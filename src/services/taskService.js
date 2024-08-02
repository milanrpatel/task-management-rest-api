const db = require('../config/db');

const getAllTasks = async () => {

    const { rows } = await db.query('SELECT * FROM tasks');
    return rows;

}

const createNewTask = async (task) => {
    const { title, description, status } = task;
    const result = await db.query(
        'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
        [title, description, status]
    );
    return result.rows[0];
};

module.exports = {
    getAllTasks,
    createNewTask,
}