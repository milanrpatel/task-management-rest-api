const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {
    const payload = {
        user: `randomUser${Math.floor(Math.random() * 100)}`,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
};

module.exports = {
    generateToken,
};
