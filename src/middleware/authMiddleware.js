const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');
const { UNAUTHORIZED_MESSAGE, INVALID_TOKEN_ERROR } = require('../config/constants');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json(errorResponse(UNAUTHORIZED_MESSAGE));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json(errorResponse(INVALID_TOKEN_ERROR));
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
