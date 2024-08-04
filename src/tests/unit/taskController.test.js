const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../../controllers/taskController');
const { getAllTasks, createNewTask, getTaskDetailsById, updateTaskByID, deleteTaskById } = require('../../services/taskService');
const { errorResponse, successResponse } = require('../../utils/response');
const { TASK_REQUIRED_MESSAGE, ALLOWED_STATUSES, ERROR_PAGINATION, ERROR_TASK_NOT_FOUND } = require('../../config/constants');

jest.mock('../../services/taskService');
jest.mock('../../utils/response');

describe('Task Controller', () => {
    let res, req;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis()
        };
    });

    describe('getTasks', () => {
        it('should return tasks with pagination', async () => {
            req.query = { limit: '5', page: '1' };
            getAllTasks.mockResolvedValue([{ id: 1, title: 'Test Task' }]);

            await getTasks(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(successResponse([{ id: 1, title: 'Test Task' }]));
        });

        it('should handle invalid pagination parameters', async () => {
            req.query = { limit: '-1', page: '1' };

            await getTasks(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(errorResponse(ERROR_PAGINATION));
        });

        it('should handle internal server errors', async () => {
            req.query = { limit: '5', page: '1' };
            getAllTasks.mockRejectedValue(new Error('Internal error'));

            await getTasks(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Internal error'));
        });
    });

    describe('getTaskById', () => {
        it('should return a task by id', async () => {
            req.params = { id: '1' };
            getTaskDetailsById.mockResolvedValue({ id: 1, title: 'Test Task' });

            await getTaskById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(successResponse({ id: 1, title: 'Test Task' }));
        });

        it('should handle task not found', async () => {
            req.params = { id: '1' };
            getTaskDetailsById.mockResolvedValue(null);

            await getTaskById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(errorResponse(`${ERROR_TASK_NOT_FOUND} with id 1`));
        });
    });

    describe('createTask', () => {
        it('should create a new task', async () => {
            req.body = { title: 'Test Task', description: 'Test Description', status: 'Pending' };
            createNewTask.mockResolvedValue(req.body);

            await createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(successResponse(req.body));
        });

        it('should handle missing required fields', async () => {
            req.body = { title: '', description: 'Test Description', status: 'In Progress' };

            await createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(errorResponse(TASK_REQUIRED_MESSAGE.title));
        });

        it('should handle valid task status type', async () => {
            req.body = { title: 'Test Task', description: 'Test Description', status: 'open' };

            await createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(errorResponse(TASK_REQUIRED_MESSAGE.status));
        });

        it('should handle internal server errors', async () => {
            req.body = { title: 'Test Task', description: 'Test Description', status: 'Pending' };
            createNewTask.mockRejectedValue(new Error('Internal error'));

            await createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Internal error'));
        });
    });

    describe('updateTask', () => {
        it('should update a task by id', async () => {
            req.params = { id: '1' };
            req.body = { title: 'Updated Task', description: 'Updated Description', status: 'Completed' };
            updateTaskByID.mockResolvedValue(req.body);

            await updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(successResponse(req.body));
        });

        it('should handle task not found', async () => {
            req.params = { id: '1' };
            req.body = { title: 'Updated Task' };
            updateTaskByID.mockResolvedValue(null);

            await updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(errorResponse(`${ERROR_TASK_NOT_FOUND} with id 1`));
        });

        it('should handle invalid fields', async () => {
            req.params = { id: '1' };
            req.body = { title: '' };

            await updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(errorResponse(TASK_REQUIRED_MESSAGE.title));
        });

        it('should handle internal server errors', async () => {
            req.params = { id: '1' };
            req.body = { title: 'Updated Task' };
            updateTaskByID.mockRejectedValue(new Error('Internal error'));

            await updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Internal error'));
        });
    });

    describe('deleteTask', () => {
        it('should delete a task by id', async () => {
            req.params = { id: '1' };
            getTaskDetailsById.mockResolvedValue({ id: 1, title: 'Test Task' });
            deleteTaskById.mockResolvedValue();

            await deleteTask(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.end).toHaveBeenCalled();
        });

        it('should handle task not found', async () => {
            req.params = { id: '1' };
            getTaskDetailsById.mockResolvedValue(null);

            await deleteTask(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(errorResponse(`${ERROR_TASK_NOT_FOUND} with id 1`));
        });

        it('should handle internal server errors', async () => {
            req.params = { id: '1' };
            getTaskDetailsById.mockResolvedValue({ id: 1, title: 'Test Task' });
            deleteTaskById.mockRejectedValue(new Error('Internal error'));

            await deleteTask(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Internal error'));
        });
    });
});
