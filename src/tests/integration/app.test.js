const request = require('supertest');
const express = require('express');
const taskRoutes = require('../../routes/taskRoutes');
const authRoutes = require('../../routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

let token;
let taskId = 1;

beforeAll(async () => {
    // Generate a token before running tests
    const res = await request(app).post('/auth/token');
    token = res.body.token;
});

describe('Task API Integration Tests', () => {

    test('GET /tasks should return all tasks', async () => {
        const res = await request(app)
            .get('/tasks?page=0&limit=10')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
    });

    test('POST /tasks should create a new task', async () => {
        const newTask = {
            title: 'Test Task',
            description: 'Test Description',
            status: 'Pending'
        };
        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(newTask);
        taskId = res.body.data.id;
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
    });

    test('GET /tasks/:id should return a task by ID', async () => {
        const res = await request(app)
            .get(`/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
    });

    test('PUT /tasks/:id should update a task by ID', async () => {
        const updatedTask = {
            title: 'Updated Test Task',
            description: 'Updated Test Description',
            status: 'Completed'
        };
        const res = await request(app)
            .put(`/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTask);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
    });

    test('DELETE /tasks/:id should delete a task by ID', async () => {
        const res = await request(app)
            .delete(`/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });

});
