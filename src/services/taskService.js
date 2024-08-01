const db = require('../config/db');

const getAllTasks = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM tasks');
        return rows;
    } catch (error) {
        console.error(error);
        return error;
    }
}

module.exports = {
    getAllTasks,
}