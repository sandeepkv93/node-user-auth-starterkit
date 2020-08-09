require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const { authorizeToken } = require('../middlewares/auth');

router.get('', authorizeToken, async (req, res) => {
    try {
        const users = await Users.find({});
        res.send(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new Users({
            username: req.body.username,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            role: req.body.role,
            dob: new Date(req.body.dob)
        });
        try {
            const newUser = await user.save();
            res.status(201).send();
        } catch (error) {
            console.error(error.message);
            res.status(400).send({ message: error.message });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username });
        if (user == null) {
            return res.status(400).send('Cannot find user');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            console.log('Login Successful');
            const payload = {
                id: user.id
            };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '30m'
                });
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            res.json({
                accessToken: accessToken, refreshToken: refreshToken
            });
        } else {
            res.send('Not Allowed');
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).send('Please login again');
    }
    try {
        const authenticatedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken({ id: authenticatedUser.id });
        res.json({
            accessToken: accessToken
        });
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(403);
    }
});

let generateAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '30m'
        });
};

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});

module.exports = router;