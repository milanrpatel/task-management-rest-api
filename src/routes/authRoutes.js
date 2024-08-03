const express = require('express');
const { generateToken } = require('../controllers/authController');

const router = express.Router();

router.post('/token', generateToken);

module.exports = router;
