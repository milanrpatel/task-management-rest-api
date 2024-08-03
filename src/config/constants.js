const ALLOWED_STATUSES = ['Pending', 'In Progress', 'Completed'];
const TASK_REQUIRED_MESSAGE = {
    title: 'Title is required',
    description: 'Description is required',
    status: `Status is required and should be one of ${ALLOWED_STATUSES.join(', ')}`,
};
const ERROR_PAGINATION = 'Invalid limit or page';
const ERROR_TASK_NOT_FOUND = 'Task not found';

module.exports = {
    ALLOWED_STATUSES,
    TASK_REQUIRED_MESSAGE,
    ERROR_PAGINATION,
    ERROR_TASK_NOT_FOUND
}