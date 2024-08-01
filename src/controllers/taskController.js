const { getAllTasks } = require('../services/taskService');

const getTasks = async (req, res) => {
    try {
        // const tasks = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getTasks,
}