const jwt = require('jsonwebtoken');
const tokenService = require('../services/token-service');

const authMiddleware = async(req, res, next) => {
    // const token = req.header('Authorization');
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = await tokenService.verifyToken(token);
        req.userId = decoded.userId;

        console.log("Decoded", decoded);
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;