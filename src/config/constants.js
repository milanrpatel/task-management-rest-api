const ALLOWED_STATUSES = ['Pending', 'In Progress', 'Completed'];
const TASK_REQUIRED_MESSAGE = {
    title: 'Title is required',
    description: 'Description is required',
    status: `Status is required and should be one of ${ALLOWED_STATUSES.join(', ')}`,
};

module.exports = {
    ALLOWED_STATUSES,
    TASK_REQUIRED_MESSAGE,
}