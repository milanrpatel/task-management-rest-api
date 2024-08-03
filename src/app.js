const express = require('express');
const config = require('./config/config');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

module.exports = app;
