const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const authorizeToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    try {
        const authenticatedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Authorization sucessful");
        req.user = await Users.findById(authenticatedUser.id);
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(403);
    }
};

module.exports = {
    authorizeToken: authorizeToken
};